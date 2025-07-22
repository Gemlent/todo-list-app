# Vue3 Todo List

一个基于 Vue 3 + Vite + TailwindCSS 构建的现代化待办事项应用。

## 特性

- ✨ 现代化的 UI 设计
- 🌓 支持亮色/暗色主题
- 📱 响应式布局
- ⚡️ 流畅的动画效果
- 🔄 实时数据同步
- 🎯 任务完成度统计

## 技术栈

- Vue 3
- Vite
- TailwindCSS
- Heroicons
- VueUse
- Headless UI

## 开发

```bash
npm install
npm run dev
```

## API 接口

应用使用以下接口：
- GET /api/get-todo - 获取所有待办事项
- POST /api/add-todo - 添加新的待办事项
- POST /api/update-todo/:id - 更新待办事项状态
- POST /api/del-todo/:id - 删除待办事项

