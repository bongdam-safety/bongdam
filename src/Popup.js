import React from 'react';
import './Popup.css'

const Popup = ({ info, onClose }) => {
  if (!info) return null; // 정보가 없으면 팝업을 표시하지 않음

  // 이미지 처리: 문자열일 경우 쉼표로 나누고, 배열로 변환
  const images = typeof info.image === 'string' 
    ? info.image.split(',') 
    : info.image;

  // 첫 번째 이미지만 선택
  const firstImage = Array.isArray(images) && images.length > 0 ? images[0].trim() : null;

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="popup-close-btn" onClick={onClose}>
          ✖
        </button>
        <h3>{info.title}</h3>
        <p>{info.description}</p>

        {/* 첫 번째 이미지 렌더링 */}
        {firstImage && (
          <img 
            src={firstImage} 
            alt={info.title} 
            className="popup-image" 
          />
        )}
      </div>
    </div>
  );
};

export default Popup;
