const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080; // 원하는 포트 번호로 설정

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',  // React 애플리케이션의 출처
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // 필요한 경우 설정
}));

// API 엔드포인트 예시
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
