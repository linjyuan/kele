<script setup lang="ts">
// 全局导入 toast 样式
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
// element dark 模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
.app-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
}
</style>
