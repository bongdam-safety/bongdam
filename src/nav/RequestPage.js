import React, { useState } from 'react';
import './RequestPage.css';
import { useNavigate } from 'react-router';
import KakaoMap from "../KakaoMap";
import axios from 'axios';

const RequestPage = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLocationSelect = (latitude, longitude) => {
    setLocation({ lat: latitude, lng: longitude });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 요청에 필요한 데이터
    const formData = new FormData();
    formData.append('requester_name', name);
    formData.append('requester_contact', contact);
    formData.append('title', title);
    formData.append('content', content);

    if (location.lat && location.lng) {
      formData.append('latitude', location.lat);
      formData.append('longitude', location.lng);
    } else {
      setMessage('지도를 클릭하여 위치를 선택해주세요.');
      return;
    }

    if (image) {
      formData.append('images', image);
    }

    try {
      // API 호출
<<<<<<< HEAD
      const response = await axios.post(`/api/request_ToCenter`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
=======
      const response = await axios.post('/api/request_ToCenter', formData);
>>>>>>> ec1d550 (....)
      setMessage('요청이 성공적으로 전송되었습니다.');
    } catch (error) {
      setMessage('요청을 보내는 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="request-container">
      <div>
        <h1 onClick={handleGoHome} style={{ cursor: 'pointer' }}>봉담읍 마을 안전지도</h1>
      </div>
      <h2>안전시설 설치 요청</h2>
      <p>
        봉담읍 주민자치회는, 봉담읍 주민을 대표하는 단체입니다.
        <br />
        봉담읍 주민자치회 안전네트워크분과는, 봉담읍에서 안전 보장이 더 필요한 곳에 대한 의견들을 모아,
        경찰서 또는 행정 등과 협력하여, 안전시설물 설치 등을 할 계획입니다.
        <br />
        봉담읍의 안전과 관련한 안전시설물 설치 등, 여러분들의 의견이 있으시면, 여기로 요청을 보내주세요.
        <br />
        봉담읍의 발전을 위한 여러분들의 의견에 진심으로 감사드립니다.
      </p>
      <form onSubmit={handleSubmit} className="request-form">
        <label>요청자 이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>연락처</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <label>지도</label>
        <KakaoMap width="100%" height="300px" onLocationSelect={handleLocationSelect} />
        {location.lat && location.lng && (
          <p>선택된 위치: 위도 {location.lat}, 경도 {location.lng}</p>
        )}

        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label>사진</label>
        <input
          type="file"
          onChange={handleFileChange}
        />

        <button type="submit">요청 보내기</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestPage;

