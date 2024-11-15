import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const { kakao } = window;

function KakaoMap({ category, width = '100%', height = '100vh' }) {
    const [markersData, setMarkersData] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await axios.get(`/api/facility/category/${category}`);
                setMarkersData(response.data);  // 응답 데이터를 저장
            } catch (error) {
                console.error("Error fetching marker data:", error);
            }
        };

        fetchMarkers();  // 컴포넌트 마운트 시 마커 데이터 가져오기
    }, [category]);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.2153629206238, 126.965393754958), // 초기 맵 중심
                level: 5
            };

      
            if (!mapRef.current) {
                mapRef.current = new kakao.maps.Map(container, options);
            }
            const map = mapRef.current;
            

            let currentInfowindow = null;
            const markers = [];

            // 사용자 위치 표시 함수
            const displayUserLocation = (lat, lon) => {
                const locPosition = new kakao.maps.LatLng(lat, lon);
                const marker = new kakao.maps.Marker({
                    position: locPosition,
                    title: '내 위치',
                });
                marker.setMap(map);
              //  map.setCenter(locPosition); // 지도의 중심을 사용자 위치로 설정
              
            };

            // Geolocation API로 현재 위치 가져오기
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        displayUserLocation(latitude, longitude);
                    },
                    error => {
                        console.error("Error getting user location:", error);
                    }
                );
            } else {
                console.warn("Geolocation을 지원하지 않습니다.");
            }

            // 마커 추가 함수
            const addMarkers = () => {
                markers.forEach(marker => marker.setMap(null));
                markers.length = 0;

                markersData.forEach(({ latitude, longitude, facilityCategory, content, imageUrls }) => {
                    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        title: facilityCategory.categoryName,
                    });
                    marker.setMap(map);
                    markers.push(marker);

                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:40px;">
                                <h5>${facilityCategory.categoryName}</h5>
                                <p>${content}</p>
                                <img src="${imageUrls}" alt="Facility Image" style="width:300px; height:auto;" />
                                </div>`,
                    });

                    kakao.maps.event.addListener(marker, 'click', () => {
                        if (currentInfowindow) {
                            currentInfowindow.close();
                        }
                        
                        infowindow.open(map, marker);
                        currentInfowindow = infowindow;

                        map.setCenter(markerPosition); // 클릭한 마커 위치로 이동
                    });
                });
            };

            // 마커 갱신
            addMarkers();
        } else {
            console.error("Kakao Maps API is not loaded properly");
        }
    }, [markersData]);

    return (
        <div 
            id='map'
            style={{
                width: width,
                height: height,
                margin: '0 auto',
            }}>
        </div>
    );
}

export default KakaoMap;
