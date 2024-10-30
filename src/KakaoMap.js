import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { kakao } = window;

function KakaoMap({ category, width = '100%', height = '100vh' }) {
    const [markersData, setMarkersData] = useState([]);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                // category를 사용하여 해당 카테고리의 마커 데이터를 가져옴
                const response = await axios.get(`/api/facility/category/${category}`);
                setMarkersData(response.data);  // 응답 데이터를 저장
            } catch (error) {
                console.error("Error fetching marker data:", error);
            }
        };

        fetchMarkers();  // 컴포넌트 마운트 시 마커 데이터 가져오기
    }, [category]);  // 카테고리가 변경될 때마다 다시 호출

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.2153629206238, 126.965393754958), // 초기 맵 중심
                level: 5
            };
            const map = new kakao.maps.Map(container, options);

            const markers = [];

            const addMarkers = () => {
                // 기존 마커 제거
                markers.forEach(marker => marker.setMap(null));
                markers.length = 0; // markers 배열 초기화

                // API에서 받은 마커 데이터로 지도에 마커 추가
                markersData.forEach(({ latitude, longitude, facilityCategory, content }) => {
                    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        title: facilityCategory.categoryName,
                    });
                    marker.setMap(map);
                    markers.push(marker);  // 마커 배열에 추가

                    // 마커 클릭 시 인포윈도우 표시
                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${facilityCategory.categoryName}<br>${content}</div>`,
                    });
                    kakao.maps.event.addListener(marker, 'click', () => {
                        infowindow.open(map, marker);
                    });
                });
            };

            // 마커 갱신
            addMarkers();
        } else {
            console.error("Kakao Maps API is not loaded properly");
        }
    }, [markersData]);  // markersData가 업데이트될 때마다 다시 지도에 마커 추가

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
