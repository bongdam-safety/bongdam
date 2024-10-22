/* global kakao */
import React, { useEffect } from 'react';
const { kakao } = window;

function KakaoMap({category, width='100%',height='100vh'}){

    useEffect(()=>{

        if (window.kakao && window.kakao.maps){
            const container = document.getElementById('map');
            const options = {
                    center:new kakao.maps.LatLng(33.450705, 126.570677),
                    level: 3
                };
            const map = new kakao.maps.Map(container,options);

            //카테고리별로 마커 데이터 설정 

            const markersData = {
                cctv: [
                    { lat: 33.450705, lng: 126.570677, title: "CCTV 1" },
                    { lat: 33.450936, lng: 126.569477, title: "CCTV 2" }
                ],
                bell:[           
                    { lat: 33.451093, lng: 126.570000, title: "Emergency Bell 1" }
                ],
                safetyHouse:[
                    { lat: 33.450580, lng: 126.570000, title: "Safe House 1" }
                ],
                projector:[
                    { lat: 33.450850, lng: 126.570500, title: "Logo Projector 1" }

                ],
                others:[
                    { lat: 33.451000, lng: 126.570300, title: "Other Facility 1" }

                ],
            };
            const markers = [];

            //현재 카테고리에 맞는 마커를 지도에 추가 
            const addMarkers = (category)=>{
                //기존 마커 제거 
                markers.forEach(marker => marker.setMap(null));

                if(markersData[category]){
                    markersData[category].forEach(({lat,lng,title})=>{
                        const markerPosition = new kakao.maps.LatLng(lat,lng);
                        const marker = new kakao.maps.Marker({
                            position:markerPosition,
                            title:title,
                        });
                        marker.setMap(map);
                        markers.push(marker);
                    });
                }
            };
            //카테고리가 변경될 때마다 마커 갱신
            addMarkers(category);

        }else {
            console.error("Kakao Maps API is not loaded properly ");
        }
    },[category])

    return(
        <div 
            id = 'map'
            style={{
                width:width,
                height:height,
                margin:'0 auto',
        }}></div>
    )
}

export default KakaoMap;