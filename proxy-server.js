const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 设置代理规则，将以 /api/list/policy 开头的请求重定向到 Mock 服务器
app.use(
  '/api/task/policy',
  createProxyMiddleware({
    target: 'http://localhost:5173/',
    changeOrigin: true,
  })
);

// 启动代理服务器，监听端口
const port = 8080;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
