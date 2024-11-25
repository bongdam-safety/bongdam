import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import './Popup.css';
const { kakao } = window;


function KakaoMap({ category, width = '100%', height = '100vh', onLocationSelect, showMarkerOnClick = true,latitude,longitude,showUserLocation = false,}) {
    const [markersData, setMarkersData] = useState([]);
    const [popupInfo, setPopupInfo] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]); // 마커 배열을 관리
    const navigate = useNavigate();
    

    // 카테고리 변경 시 마커 데이터 가져오기
    useEffect(() => {
        const fetchMarkers = async () => {
            if(! category) return
            try {
                const response = await axios.get(`/api/facility/category/${category}`);
                setMarkersData(response.data);
                setPopupInfo(null); // 팝업 초기화
            } catch (error) {
                console.error("Error fetching marker data:", error);
            }
        };
        fetchMarkers();
    }, [category]);

    // 지도 및 마커 처리
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) {
            console.error("Kakao Maps API is not loaded properly");
            return;
        }

        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.2153629206238, 126.965393754958),
            level: 5,
        };

        if (!mapRef.current) {
            mapRef.current = new kakao.maps.Map(container, options);
        }

        const map = mapRef.current;
        
    // 주어진 위치에 마커 추가
    if (latitude && longitude) {
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: map,
        });

        map.setCenter(markerPosition);
    }



        // 사용자 위치 표시
        const displayUserLocation = (lat, lon) => {
            const locPosition = new kakao.maps.LatLng(lat, lon);
            const imageSrc = './299087_marker_map_icon.png'; // 마커 이미지 URL
            const imageSize = new kakao.maps.Size(40, 40); // 마커 이미지 크기
            const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커 이미지 옵션

            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

           
            const marker = new kakao.maps.Marker({
                position: locPosition,
                title: '내 위치',
                image:markerImage,
            });
            marker.setMap(map);

            map.setCenter(locPosition);
        };

        if (showUserLocation&&navigator.geolocation) {
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

        // 지도 클릭 시 마커 표시 (showMarkerOnClick이 true일 때만)
        if (showMarkerOnClick) {
            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                const latlng = mouseEvent.latLng;

                markersRef.current.forEach((marker) => marker.setMap(null));
                markersRef.current = []; // 마커 배열 초기화
              
                if (onLocationSelect) {
                    onLocationSelect(latlng.getLat(), latlng.getLng()); // 부모 컴포넌트에 클릭 좌표 전달
                }

                // 클릭한 위치에 마커 추가
                const marker = new kakao.maps.Marker({
                    position: latlng,
                    map: map,
                });

                markersRef.current.push(marker); // 새 마커 저장
                if (onLocationSelect) {
                    onLocationSelect(latlng.getLat(), latlng.getLng()); // 부모 컴포넌트에 클릭 좌표 전달
                }
            });
        }

        // 기존 마커 제거 및 새 마커 추가
        const addMarkers = () => {
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = []; // 마커 배열 초기화

            markersData.forEach(({ latitude, longitude, facilityCategory, content, imageUrls }) => {
                const markerPosition = new kakao.maps.LatLng(latitude, longitude);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                    title: facilityCategory.categoryName,
                });
                marker.setMap(map);
                markersRef.current.push(marker); // 새 마커 저장

                kakao.maps.event.addListener(marker, 'click', () => {
                    setPopupInfo({
                        position: markerPosition,
                        title: facilityCategory.categoryName,
                        content: content,
                        image: imageUrls,
                    });

                    map.setCenter(markerPosition); // 클릭한 마커 위치로 이동
                });
            });
        };

        addMarkers();
    }, [markersData, showMarkerOnClick]);



    return (
        <>
            <div 
                id='map'
                style={{
                    width: width,
                    height: height,
                    margin: '0 auto',
                }}>
            </div>
            {popupInfo && (
    <div className="popup-container">
        <button 
            onClick={() => setPopupInfo(null)}
            className="popup-close-button">
            ✖
        </button>
        <h3 className="popup-title">{popupInfo.title}</h3>
        <p className="popup-content">{popupInfo.content}</p>
        
        {popupInfo.image && (
            <img 
                src={popupInfo.image[0]}  // 첫 번째 이미지를 표시
                alt="Facility" 
                className="popup-image" 
            />
        )}
    </div>
)}

        </>
    );
}

export default KakaoMap;

