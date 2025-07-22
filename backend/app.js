// 导入必要的模块
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const todoRoutes = require('./routes/todo');
const cors = require('cors');

// 创建 Express 应用实例
const app = express();

// 配置中间件
app.use(cors());
app.use(express.json()); // 用于解析 JSON 请求体
app.use(morgan('dev')); // 添加日志中间件

// 配置数据库连接
const MONGODB_URI = 'mongodb://root:mvclbfgx@todolist-mongodb.ns-03xv4nql.svc:27017';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 注册路由
app.use('/api', todoRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// 设置服务器端口
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 