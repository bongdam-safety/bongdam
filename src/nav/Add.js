import React, { useState } from "react";
import "./Add.css"; // 스타일을 위한 CSS 파일 임포트
import { useNavigate } from "react-router";
import KakaoMap from "../KakaoMap";
import axios from "axios"; // axios 임포트

const Add = () => {
  const navigate = useNavigate();

  // 입력 필드 상태 관리
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [remarks, setRemarks] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pictures, setPictures] = useState([]);

  const handleMapClick = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    console.log("클릭한 좌표:", { lat, lng });

  };


  const handlePictureChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 1) {
      alert("사진은 최대 2장까지만 첨부할 수 있습니다.");
      return;
    }
    setPictures(files);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

     // 필수 데이터가 모두 입력되었는지 확인
  if (!category) {
    alert("분류를 선택해주세요.");
    return;
  }
  if (!latitude || !longitude) {
    alert("지도를 클릭하여 위치를 선택해주세요.");
    return;
  }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("facilityCategoryId", category);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("content", content);
    formData.append("note", remarks);

    // 사진 파일이 선택된 경우에만 FormData에 추가
    if (pictures.length > 0) {
      pictures.forEach((file) => {
        formData.append("pictures", file);
      });
    }

    const apiUrl = `/api/facility/${category}`;
    try {
      // API로 POST 요청 보내기
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더
        },
      });

      // 요청 성공 시 처리 (예: 홈 페이지로 이동)
      if (response.status === 200) {
        console.log("시설 추가 성공:", response.data);
        navigate("/"); // 홈으로 이동
      }
    } catch (error) {
      console.error("시설 추가 실패:", error.response || error.message);
      if(error.response){
        alert(`추가 실패: ${error.response.data.message || "오류가 발생했습니다."}`);
      }
    }
  };

  return (
    <div className="add-container">
      <div>
        <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>봉담 마을 지도</h1>
      </div>
      <div className="auth-form">
       < KakaoMap
       width="100%" height="300px"
        onLocationSelect={(lat, lng) => {
        setLatitude(lat);
        setLongitude(lng);
        
      }}
      showMarkerOnClick={true}
    />
          <form onSubmit={handleSubmit} className="add-form">
          <label>분류</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">---선택하세요---</option>
            <option value={1}>방범 CCTV</option>
            <option value={2}>비상벨</option>
            <option value={3}>안심지킴이집/지구대</option>
            <option value={4}>기타</option>
          </select>

          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용 입력"
            required
          />

          <label>사진 첨부</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePictureChange}
          />

          <label>비고</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="비고 입력"
          />

          <div className="submit">
            <button type="submit">추가하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
