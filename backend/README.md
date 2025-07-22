# Todo List Backend

这是一个基于 Node.js 和 Express 框架开发的 Todo List 后端 API 服务。

## 技术栈

- Node.js
- Express
- MongoDB
- Mongoose
- Morgan (日志)
- CORS

## API 接口

### 1. 获取所有待办事项
- **GET** `/api/get-todo`
- 返回所有待办事项列表

### 2. 添加新的待办事项
- **POST** `/api/add-todo`
- 请求体:
json
{
"value": "待办事项内容",
"isCompleted": false
}

### 3. 更新待办事项状态
- **POST** `/api/update-todo/:id`
- 更新指定 ID 待办事项的完成状态

### 4. 删除待办事项
- **POST** `/api/del-todo/:id`
- 删除指定 ID 的待办事项

## 安装和运行

1. 克隆仓库
bash
git clone [仓库地址]

2. 安装依赖
bash
npm install

3. 启动服务
node app.js

## 环境要求

- Node.js >= 14.0.0
- MongoDB >= 4.0.0


