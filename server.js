import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// 解决 __dirname 在 ES 模块里不存在的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 托管静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// 根路径响应
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动服务
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
