const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 获取所有待办事项
router.get('/get-todo', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: todos
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '获取待办事项失败',
      error: err.message
    });
  }
});

// 添加新的待办事项
router.post('/add-todo', async (req, res) => {
  try {
    const { value, isCompleted = false } = req.body;
    
    // 验证输入
    if (!value || typeof value !== 'string') {
      return res.status(400).json({
        success: false,
        message: '待办事项内容不能为空且必须是字符串'
      });
    }

    const newTodo = new Todo({
      value,
      isCompleted
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({
      success: true,
      data: savedTodo
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '添加待办事项失败',
      error: err.message
    });
  }
});

// 更新待办事项状态
router.post('/update-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 查找并更新待办事项
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '待办事项不存在'
      });
    }

    todo.isCompleted = !todo.isCompleted;
    const updatedTodo = await todo.save();

    res.json({
      success: true,
      data: updatedTodo
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '更新待办事项失败',
      error: err.message
    });
  }
});

// 删除待办事项
router.post('/del-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 查找并删除待办事项
    const deletedTodo = await Todo.findByIdAndDelete(id);
    
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: '待办事项不存在'
      });
    }

    res.json({
      success: true,
      message: '待办事项已成功删除',
      data: deletedTodo
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '删除待办事项失败',
      error: err.message
    });
  }
});

module.exports = router; 