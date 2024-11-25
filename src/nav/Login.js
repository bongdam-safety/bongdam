import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  const [isLoginMode, setIsLoginMode] = useState(true); // 로그인 모드 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post(`/api/users/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        navigate('/admin'); // `/admin` 페이지로 이동
      }
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
      alert('로그인 실패. 이메일과 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="home-container">
      <div>
        <h1 onClick={handleGoHome} style={{ cursor: 'pointer' }}>
          봉담읍 마을 안전지도
        </h1>
      </div>

      {isLoginMode && (
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <button type="submit">로그인</button>
        </form>
      )}
    </div>
  );
};

export default Login;
