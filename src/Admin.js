import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
    const [requestData, setRequestData] = useState([]);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bongdamsafe.co.kr:8080/api/request_ToCenter');
                
                // 데이터 매핑
                const mappedData = response.data.map((item) => ({
                    id: item.id,
                    title: item.facilityCategory.categoryName || "카테고리 없음",
                    details: item.content,
                    location: `위도: ${item.latitude}, 경도: ${item.longitude}`,
                    images: item.imageUrls || [], // 이미지 배열
                }));

                setRequestData(mappedData);
            } catch (error) {
                console.error('데이터 요청 중 오류:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>관리자 페이지</h1>
            <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>카테고리</th>
                        <th>내용</th>
                        <th>위치</th>
                        <th>이미지</th>
                    </tr>
                </thead>
                <tbody>
                    {requestData.map((request) => (
                        <tr key={request.id}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{request.id}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{request.title}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{request.details}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{request.location}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {request.images.length > 0
                                    ? request.images.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`요청 이미지 ${index + 1}`}
                                            style={{ width: "50px", height: "50px", marginRight: "5px" }}
                                        />
                                    ))
                                    : "이미지 없음"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
