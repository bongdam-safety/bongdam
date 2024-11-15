import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from './Footer';
import KakaoMap from './KakaoMap';
import { Link } from 'react-router-dom';
import './Home.css';  // CSS 파일 연결

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleClick = () => {
    navigate('/');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="header">
        <h1 onClick={handleClick} className="home-title">
          봉담읍 마을 안전지도
        </h1>
        <Link to="/Login" className="login-button">
          <button className="btn">로그인</button>
        </Link>
      </div>
      <KakaoMap category={selectedCategory} />
      <Footer onCategorySelect={handleCategorySelect} />
    </div>
  );
};

export default Home;

