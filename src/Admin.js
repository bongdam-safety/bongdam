import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // 테이블 스타일 적용
import { Link } from "react-router-dom";

function Admin() {
  const [requestData, setRequestData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); // 선택된 요청 데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/request_ToCenter`); // 요청 데이터 API
        setRequestData(response.data); // 데이터 저장
      } catch (error) {
        console.error("데이터 요청 중 오류:", error);
      }
    };

    fetchData();
  }, []);

  // 상세 보기 클릭 시 모달 열기
  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div>
      <div className="header">
        <h1>관리자 페이지</h1>
        <div className="button-container">
          <Link to="/Add" className="add-button">
            <button>지도에 항목 추가</button>
          </Link>
     
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>요청번호</th>
            <th>제목</th>
            <th>요청일자</th>
            <th>상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {requestData.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.title}</td>
              <td>{request.date_requested}</td>
              <td>
                <button onClick={() => handleOpenModal(request)}>상세 보기</button>
              </td>
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

      {/* 모달 컴포넌트 */}
      {isModalOpen && selectedRequest && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRequest.title}</h2>
            <p>{selectedRequest.requester_name}</p>
            <p>{selectedRequest.requester_contact}</p>
            <p>{selectedRequest.latitude},{selectedRequest.longitude}</p>
            <p>{selectedRequest.details}</p>
            {selectedRequest.imageUrls && (
              <img
                src={selectedRequest.imageUrls}
                alt="Request"
                style={{ width: "450px", height: "450px" }}
              />
            )}
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
