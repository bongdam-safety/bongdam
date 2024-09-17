import React from "react";
import "./Footer.css"; // 스타일을 위한 CSS 파일을 임포트

const Footer = ({ onCategorySelect }) => {
  return (
    <div className="footer">
      <div onClick={() => onCategorySelect("cctv")}>방범 CCTV</div>
      <div onClick={() => onCategorySelect("bell")}>비상벨</div>
      <div onClick={() => onCategorySelect("safetyHouse")}>안심지킴이집 지구대</div>
      <div onClick={() => onCategorySelect("projector")}>로고젝터</div>
      <div onClick={() => onCategorySelect("others")}>기타</div>
    </div>
  );
};

export default Footer;
