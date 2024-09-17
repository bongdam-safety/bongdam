// Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import KakaoMap from './KakaoMap';


const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelect = (category) => {
    selectedCategory(category);
  }

  return (
    <div>
      <h1 onClick={handleClick} style={{cursor:'pointer'}}>
        봉담 마을 지도
      </h1>
      <Navbar />
      <KakaoMap />
      <Footer />
    </div>
  );
};

export default Home;
