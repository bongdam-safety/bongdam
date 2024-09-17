/* global kakao */
import React, { useEffect } from 'react';
const { kakao } = window;

function KakaoMap(){

    useEffect(()=>{
        if (window.kakao && window.kakao.maps){
            const container = document.getElementById('map');
            const options = {
                    center:new kakao.maps.LatLng(33.450705, 126.570677),
                    level: 3
                };
            const map = new kakao.maps.Map(container,options);
        }else {
            console.error("Kakao Maps API is not loaded properly ");
        }
    },[])

    return(
        <div 
            id = 'map' 
            style={{
                width:'500px',
                height:'500px',
                margin:'0 auto'
        }}></div>
    )
}

export default KakaoMap;