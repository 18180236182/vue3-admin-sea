import { createRouter, createWebHashHistory } from 'vue-router'
// import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/utlis'
// import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    // 无路由自动匹配
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 点击登录事件
router.beforeEach((to) => {
  // 前后端交互
  // if (to.path !== '/login') {
  //   const token = localCache.getCache('token')
  //   // 没有token 返回登录页
  //   if (!token) {
  //     ElMessage.error('登录失败，请重新登录！')
  //     return '/login'
  //   }
  // }
  // 跳转到默认的第一个路由
  if (to.path === '/main') {
    return firstMenu.path
  }
})
export default router
