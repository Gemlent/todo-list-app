const mongoose = require('mongoose');

// 定义 Todo 模型的架构
const todoSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, '待办事项内容不能为空'],
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // 自动添加 createdAt 和 updatedAt 字段
});

// 创建并导出 Todo 模型
module.exports = mongoose.model('Todo', todoSchema); 