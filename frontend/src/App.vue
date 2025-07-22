<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useDark, useToggle } from '@vueuse/core'
import TodoList from './components/TodoList.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 基础背景 -->
    <div class="absolute inset-0 transition-all duration-700">
      <!-- 日间模式背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-background-light via-background-lighter to-white 
                  dark:opacity-0 opacity-100 transition-opacity duration-700">
        <!-- 日间装饰效果 -->
        <div class="absolute inset-0 bg-gradient-to-tr from-primary-light/10 to-transparent opacity-50"></div>
      </div>

      <!-- 夜间模式背景 -->
      <div class="absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-700">
        <!-- 背景图片层 -->
        <div class="absolute inset-0 bg-night bg-cover bg-center">
          <!-- 暗色叠加层 -->
          <div class="absolute inset-0 bg-background-darkest/60 backdrop-blur-sm"></div>
        </div>
        
        <!-- 装饰效果层 -->
        <div class="absolute inset-0">
          <!-- 渐变叠加 -->
          <div class="absolute inset-0 bg-gradient-to-b from-background-darker/30 to-background-darkest/50"></div>
          
          <!-- 星光效果 -->
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff15_1px,_transparent_1px)] 
                        bg-[size:20px_20px] opacity-40"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_#ffffff10_2px,_transparent_2px)] 
                        bg-[size:40px_40px] opacity-30"></div>
          </div>
          
          <!-- 光晕效果 -->
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-background-nightglow to-transparent 
                        animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="relative">
      <header class="fixed top-0 left-0 right-0 bg-white/70 dark:bg-background-darker/40 backdrop-blur-md z-10
                     border-b border-gray-200/50 dark:border-gray-800/30 shadow-sm dark:shadow-primary/5">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Todo List
          </h1>
          <button 
            @click="toggleDark()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <sun-icon v-if="isDark" class="w-6 h-6" />
            <moon-icon v-else class="w-6 h-6" />
          </button>
        </div>
      </header>

      <main class="container mx-auto px-4 pt-24 pb-8">
        <TodoList />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 删除所有现有样式 */
</style>
