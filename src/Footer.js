import React from "react";
import "./KakaoMap"; 
import "./Footer.css";

const Footer = ({ onCategorySelect }) => {
  return (
    <div className="footer">
      <div onClick={() => onCategorySelect(1)}>방범 CCTV</div>
      <div onClick={() => onCategorySelect(2)}>비상벨</div>
      <div onClick={() => onCategorySelect(3)}>안심지킴이집 지구대</div>
      <div onClick={() => onCategorySelect(4)}>로고젝터</div>
      <div onClick={() => onCategorySelect(5)}>기타</div>
    </div>
  );
};

export default Footer;
