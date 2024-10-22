import React, {useState} from "react";
import "./Add.css"; // 스타일을 위한 CSS 파일을 임포트
import { useNavigate } from 'react-router';
import KakaoMap from "../KakaoMap";

const Add = () => {

    const navigate = useNavigate();
    const handleGoHome = () => {
      navigate('/');
    };
  // 각 입력 필드의 상태값을 관리하기 위한 useState 훅
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직 구현 (예: API 호출)
    console.log({ category, title, content, pictures, remarks });
  };

  return (
    <div className="add-container">
        <div>
        <h1 onClick={handleGoHome} style={{cursor:'pointer'}}>봉담 마을 지도</h1>
      </div>
      <h1>시설물 추가 요청</h1>
      <KakaoMap category="all" width="500px" height="500px"/> 
      <form onSubmit={handleSubmit} className="add-form">
        <label>분류</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="시설물 분류 입력"
        />

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

        <label>사진 첨부</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePictureChange}
        />
         <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePictureChange}
        />

        <label>비고</label>
        <input
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="비고 입력"
        />

        <button type="submit">제출하기</button>
      </form>
    </div>
  );
};

export default Add;
