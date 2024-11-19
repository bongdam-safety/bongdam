import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // 테이블 스타일 적용
import { Link } from "react-router-dom";
import KakaoMap from "./KakaoMap";

function Admin() {
  const [requestData, setRequestData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); // 선택된 요청 데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/request_ToCenter`);
        setRequestData(response.data); 
        
      } catch (error) {
        console.error("데이터 요청 중 오류:", error);
      }
    };
    fetchData();
  }, []);

  // 모달 열기/닫기
  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // 요청 삭제
  const handleDeleteRequest = async (id) => {
    try {
      await axios.delete(`/api/request_ToCenter/${id}`);
      setRequestData((prevData) => prevData.filter((request) => request.id !== id));
      handleCloseModal();
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 중 오류:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="admin-container">
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
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedRequest && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRequest.title}</h2>
            <div className="modal-map">
              <KakaoMap
                category={null}
                latitude={selectedRequest.latitude} 
                longitude={selectedRequest.longitude}
                width="100%"
                height="300px"
                showMarkerOnClick={false}
                onLocationSelect={null}
              />
            </div>
            <p>{selectedRequest.content}</p>
            {selectedRequest.imageUrls && (
              <img
                src={selectedRequest.imageUrls}
                alt="Request"
                className="modal-image"
              />
            )}
            <button onClick={handleCloseModal} className="close-button">닫기</button>
            <button
              onClick={() => handleDeleteRequest(selectedRequest.id)}
              className="delete-button"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
