import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // 테이블 스타일 적용

function Admin() {
  const [requestData, setRequestData] = useState([]);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "bongdamsafe.co.kr:8080/api/request_ToCenter" // 요청 데이터 API
        );
        setRequestData(response.data); // 데이터 저장
      } catch (error) {
        console.error("데이터 요청 중 오류:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>관리자 페이지</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>요청번호</th>
            <th>제목</th>
            <th>요청일자</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {requestData.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.title}</td>
              <td>{request.content}</td>
              <td>{request.date_requested}</td>
              <td>
                {request.image && (
                  <img
                    src={request.imageUrls}
                    alt="Request"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
