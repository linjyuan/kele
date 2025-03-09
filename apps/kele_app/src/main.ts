import './assets/main.css'
import "./styles/main.css"
import { createApp, getCurrentInstance } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from 'axios';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css' // 引入css

const app = createApp(App)
// 将 Axios 挂载到全局
app.config.globalProperties.$axios = axios;
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
