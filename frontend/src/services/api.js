const BASE_URL = 'https://etvrzgixthrf.sealoshzh.site'

export const todoApi = {
  // 获取所有待办事项
  async getAllTodos() {
    try {
      const response = await fetch(`${BASE_URL}/api/get-todo`)
      if (!response.ok) {
        throw new Error('网络请求失败')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || '获取待办事项失败')
      }
      return data.data
    } catch (error) {
      console.error('获取待办事项失败:', error)
      throw error
    }
  },

  // 添加新的待办事项
  async addTodo(value) {
    try {
      const response = await fetch(`${BASE_URL}/api/add-todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      })
      if (!response.ok) {
        throw new Error('网络请求失败')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || '添加待办事项失败')
      }
      return data.data
    } catch (error) {
      console.error('添加待办事项失败:', error)
      throw error
    }
  },

  // 更新待办事项状态
  async updateTodo(id, isCompleted) {
    try {
      const response = await fetch(`${BASE_URL}/api/update-todo/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted }),
      })
      if (!response.ok) {
        throw new Error('网络请求失败')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || '更新待办事项失败')
      }
      return data.data
    } catch (error) {
      console.error('更新待办事项失败:', error)
      throw error
    }
  },

  // 删除待办事项
  async deleteTodo(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/del-todo/${id}`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('网络请求失败')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || '删除待办事项失败')
      }
      return data.data
    } catch (error) {
      console.error('删除待办事项失败:', error)
      throw error
    }
  },
} 