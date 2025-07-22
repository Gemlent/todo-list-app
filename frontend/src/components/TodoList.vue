<template>
  <div v-if="loading" class="fixed top-4 right-4 bg-primary/10 text-primary px-4 py-2 rounded-lg">
    加载中...
  </div>
  <div v-if="error" class="fixed top-4 right-4 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg">
    {{ error }}
  </div>
  <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
    <!-- 添加新任务 -->
    <div class="flex gap-3">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="添加新的待办事项..."
        class="input flex-1"
      />
      <button @click="addTodo" class="btn-primary flex items-center gap-2">
        <plus-icon class="w-5 h-5" />
        添加
      </button>
    </div>

    <!-- 过滤和统计 -->
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="currentFilter = filter.value"
          :class="[
            'btn',
            currentFilter === filter.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        完成度: {{ completionRate }}%
      </div>
    </div>

    <!-- 任务列表 -->
    <TransitionGroup
      name="list"
      tag="ul"
      class="space-y-3"
    >
      <li
        v-for="todo in filteredTodos"
        :key="todo._id"
        class="group bg-white/95 dark:bg-background-darker/40 rounded-xl p-4 shadow-sm hover:shadow-md 
               transition-all animate-slide-in backdrop-blur-sm"
      >
        <div class="flex items-center gap-3">
          <button
            @click="toggleTodo(todo)"
            class="flex-shrink-0"
          >
            <check-circle-icon
              :class="[
                'w-6 h-6 transition-colors',
                todo.isCompleted
                  ? 'text-green-500'
                  : 'text-gray-300 dark:text-gray-600 group-hover:text-gray-400'
              ]"
            />
          </button>
          <span
            :class="[
              'flex-1',
              todo.isCompleted ? 'line-through text-gray-400' : ''
            ]"
          >
            {{ todo.value }}
          </span>
          <button
            @click="removeTodo(todo)"
            class="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <trash-icon class="w-5 h-5 text-red-500 hover:text-red-600" />
          </button>
        </div>
      </li>
    </TransitionGroup>

    <!-- 空状态 -->
    <div
      v-if="filteredTodos.length === 0"
      class="text-center py-12 text-gray-500 dark:text-gray-400"
    >
      <inbox-icon class="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p>{{ emptyStateMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon,
  CheckCircleIcon,
  TrashIcon,
  InboxIcon
} from '@heroicons/vue/24/outline'
import { todoApi } from '../services/api'

const todos = ref([])
const newTodo = ref('')
const currentFilter = ref('all')
const loading = ref(false)
const error = ref(null)

const filters = [
  { label: '全部', value: 'all' },
  { label: '待完成', value: 'active' },
  { label: '已完成', value: 'completed' }
]

// 获取所有待办事项
async function fetchTodos() {
  try {
    loading.value = true
    error.value = null
    const data = await todoApi.getAllTodos()
    todos.value = data
  } catch (err) {
    error.value = '获取待办事项失败'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 添加新待办事项
async function addTodo() {
  const text = newTodo.value.trim()
  if (text) {
    try {
      loading.value = true
      error.value = null
      const newTask = await todoApi.addTodo(text)
      todos.value.unshift(newTask)
      newTodo.value = ''
    } catch (err) {
      error.value = '添加待办事项失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
}

// 切换待办事项状态
async function toggleTodo(todo) {
  try {
    loading.value = true
    error.value = null
    const updatedTodo = await todoApi.updateTodo(todo._id, !todo.isCompleted)
    const index = todos.value.findIndex(t => t._id === todo._id)
    if (index !== -1) {
      todos.value[index] = updatedTodo
    }
  } catch (err) {
    error.value = '更新待办事项失败'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 删除待办事项
async function removeTodo(todo) {
  try {
    loading.value = true
    error.value = null
    await todoApi.deleteTodo(todo._id)
    const index = todos.value.findIndex(t => t._id === todo._id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  } catch (err) {
    error.value = '删除待办事项失败'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 计算属性
const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.isCompleted)
    case 'completed':
      return todos.value.filter(todo => todo.isCompleted)
    default:
      return todos.value
  }
})

const completionRate = computed(() => {
  if (todos.value.length === 0) return 0
  const completedCount = todos.value.filter(todo => todo.isCompleted).length
  return Math.round((completedCount / todos.value.length) * 100)
})

const emptyStateMessage = computed(() => {
  switch (currentFilter.value) {
    case 'active':
      return '没有待完成的任务'
    case 'completed':
      return '没有已完成的任务'
    default:
      return '开始添加你的第一个任务吧'
  }
})

// 页面加载时获取待办事项
onMounted(fetchTodos)
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style> 