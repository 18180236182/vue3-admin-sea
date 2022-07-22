import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
// element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
const app = createApp(App)
// f5刷新丢失路由处理
setupStore()
app.use(store).use(router).use(ElementPlus).mount('#app')
