# Todo List 全栈应用

一个现代化的待办事项管理应用，包含 Vue3 前端和 Node.js 后端服务。

## 特性

### 前端特性
- ✨ 现代化的 UI 设计
- 🌓 支持亮色/暗色主题
- 📱 响应式布局
- ⚡️ 流畅的动画效果
- 🔄 实时数据同步
- 🎯 任务完成度统计

### 后端特性
- 🚀 高性能 RESTful API
- 🔒 数据持久化存储
- 📝 请求日志记录
- 🌐 跨域资源共享支持

## 技术栈

### 前端
- Vue 3
- Vite
- TailwindCSS
- Heroicons
- VueUse
- Headless UI

### 后端
- Node.js
- Express
- MongoDB
- Mongoose
- Morgan (日志)
- CORS

## 项目结构
todo-list-app/

├── frontend/ # Vue3 前端应用

├── backend/ # Node.js 后端服务

└── README.md # 本文档



## 快速开始

### 1. 安装依赖

- 安装前端依赖
```
cd frontend
npm install
```
- 安装后端依赖
```
cd ../backend
npm install
```

### 2. 配置环境变量
在 backend/.env 文件中添加 MongoDB 连接配置：

```.env```
> ```env
> MONGODB_URI=mongodb://localhost:27017/todoapp
> PORT=3000
> ```

### 3. 启动服务
- 启动后端服务 (在 backend 目录)
> node app.js
- 启动前端开发服务器 (在 frontend 目录)
> npm run dev

### API 接口文档
后端提供以下 RESTful 接口：

1. 获取所有待办事项
GET /api/get-todo

响应: 待办事项列表

2. 添加新待办事项
POST /api/add-todo

请求体:

```json```
> ```json
> {
>   "value": "待办事项内容",
>   "isCompleted": false
> }
> ```

3. 更新待办事项状态
POST /api/update-todo/:id

参数: id (待办事项ID)

4. 删除待办事项
POST /api/del-todo/:id

参数: id (待办事项ID)

## 开发指南
- 前端开发
  
```bash```
> ```bash
> cd frontend
> npm run dev  # 启动开发服务器 (默认: http://localhost:5173)
> ```

- 后端开发
  
```bash```
> ```bash
> cd backend
> node app.js  # 启动API服务 (默认: http://localhost:3000)
> ```

## 环境要求
- Node.js >= 16.0.0

- MongoDB >= 5.0.0

- npm >= 8.0.0

## 配置说明
- 前端代理配置 (开发环境)
在 frontend/vite.config.js 中添加：

```js```
> ```js
> export default defineConfig({
>   server: {
>     proxy: {
>       '/api': {
>       target: 'http://localhost:3000',
>       changeOrigin: true
>       }
>     }
>   }
> })
> ```
- 数据库配置
安装 ```MongoDB```: https://www.mongodb.com/docs/manual/installation/

- 创建数据库:

```bash```
```bash
use todoapp
db.createCollection('todos')
```


### 欢迎提交 PR！请确保：

- 代码符合 ESLint 规则

- 添加适当的单元测试

- 更新相关文档
