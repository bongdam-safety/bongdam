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

  // 회원가입 상태
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 (현재는 단순한 콘솔 출력으로 대체)
    console.log('로그인 시도:', { email, password });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 회원가입 처리 로직 (현재는 단순한 콘솔 출력으로 대체)
    console.log('회원가입 시도:', { signupEmail, signupPassword });
  };

  return (
    <div className="home-container">
      <div>
        <h1 onClick={handleGoHome} style={{cursor:'pointer'}}>봉담 마을 지도</h1>
      </div>

      <div className="auth-toggle">
        <button onClick={() => setIsLoginMode(true)} className={isLoginMode ? 'active' : ''}>
          로그인
        </button>
        <button onClick={() => setIsLoginMode(false)} className={!isLoginMode ? 'active' : ''}>
          회원가입
        </button>
      </div>

      {isLoginMode ? (
        // 로그인 폼
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <h2>로그인</h2>
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
      ) : (
        // 회원가입 폼
        <form onSubmit={handleSignupSubmit} className="auth-form">
          <h2>회원가입</h2>
          <div className="form-group">
            <label htmlFor="signupEmail">이메일</label>
            <input
              type="email"
              id="signupEmail"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">비밀번호</label>
            <input
              type="password"
              id="signupPassword"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>
          <button type="submit">회원가입</button>
        </form>
      )}
    </div>
  );
};

export default Login;
