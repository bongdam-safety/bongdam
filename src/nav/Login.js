import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router';

const Login = () => {

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };
  
  const [isLoginMode, setIsLoginMode] = useState(true); // 로그인과 회원가입을 전환하는 상태

  // 로그인 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 (현재는 단순한 콘솔 출력으로 대체)
    console.log('로그인 시도:', { email, password });
  };

  return (
    <div className="home-container">
      <div>
        <h1 onClick={handleGoHome} style={{cursor:'pointer'}}>봉담읍 마을 안전지도</h1>
      </div>


      {isLoginMode && (
        // 로그인 폼
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
