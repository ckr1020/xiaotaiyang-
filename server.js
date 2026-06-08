const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 托管静态文件（你的 build 文件夹）
app.use(express.static(path.join(__dirname, 'dist')));

// 根路径响应
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动服务
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
