import React, { useState } from "react";
import "./UpdateRequest.css"; // 스타일을 위한 CSS 파일을 임포트
import { useNavigate } from 'react-router';
import KakaoMap from "../KakaoMap";

const UpdateRequest = () => {

    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    };

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState(""); // 나중에 지도를 클릭해서 위치를 설정하도록 변경 가능
  const [pictures, setPictures] = useState([]);

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
    console.log({ title, details, location, pictures });
  };

  return (
    <div className="update-container">
     <div>
        <h1 onClick={handleGoHome} style={{cursor:'pointer'}}>봉담읍 마을 안전지도</h1>
      </div>
      <h2>정보 수정 요청</h2>
      <form onSubmit={handleSubmit} className="update-form">


        <label>요청 사항</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="요청 사항 입력"
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

        <button type="submit">제출하기</button>
      </form>
    </div>
  );
};

export default UpdateRequest;
