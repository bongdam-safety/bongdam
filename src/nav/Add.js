import React, { useState } from "react";
import "./Add.css"; // 스타일을 위한 CSS 파일을 임포트
import { useNavigate } from 'react-router';
import KakaoMap from "../KakaoMap";
import axios from "axios"; // axios 임포트

const Add = () => {
  const navigate = useNavigate();
  
  // 입력 필드 상태 관리
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictures, setPictures] = useState([]);
  const [remarks, setRemarks] = useState("");

  // 사진 파일 선택 시 최대 2장까지만 허용
  const handlePictureChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
      alert("사진은 최대 2장까지만 첨부할 수 있습니다.");
      return;
    }
    setPictures(files);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("remarks", remarks);
    
    // 사진 파일이 선택된 경우에만 FormData에 추가
    if (pictures.length > 0) {
      pictures.forEach((file, index) => {
        formData.append("pictures", file);
      });
    }

    try {
      // API로 POST 요청 보내기
      const response = await axios.post(`/api/facility`, formData, {
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
      console.error("시설 추가 실패:", error);
    }
  };

  return (
    <div className="add-container">
      <div>
        <h1 onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>봉담 마을 지도</h1>
      </div>
      <div className="auth-form">
        <KakaoMap category="all" width="100%" height="300px" />
        <form onSubmit={handleSubmit} className="add-form">
          <label>분류</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">---선택하세요---</option>
            <option value={1}>방범 CCTV</option>
            <option value={2}>비상벨</option>
            <option value={3}>안심지킴이집/지구대</option>
            <option value={4}>기타</option>
          </select>

          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력"
          />

          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용 입력"
          />

          <label>사진 첨부 (선택)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePictureChange}
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
