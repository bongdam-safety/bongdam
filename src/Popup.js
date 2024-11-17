import React from 'react';
import './Popup.css'; // 팝업 스타일 정의

const Popup = ({ info, onClose }) => {
  if (!info) return null; // 정보가 없으면 팝업을 표시하지 않음

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="popup-close-btn" onClick={onClose}>
          ✖
        </button>
        <h3>{info.title}</h3>
        <p>{info.description}</p>
        {info.image && <img src={info.image} alt={info.title} />}
      </div>
    </div>
  );
};

export default Popup;
