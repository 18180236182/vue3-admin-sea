import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

export const baseURL = 'http://192.168.0.112:10719'
const hrequest = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
hrequest.interceptors.request.use(config => {
  // 2. 判断是否有token
  const token = localCache.getCache('token')
  if (token) {
    config.headers.token = token
  }
  // 对get请求含中括号的参数进行格式化
  if (config.method === 'get') {
    let url = config.url
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (JSON.stringify(config.params[key]).indexOf('[') !== -1) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
        config.params = {}
      }
    }
    url = url.substring(0, url.length - 1)
    config.url = url
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
hrequest.interceptors.response.use(res => res.data, err => {
  // 401 状态码，进入该函数
  if (err.response && err.response.status === 401) {
    // localCache.deleteCache('token')
    ElMessage.error('token失效，请重新登录！')
    console.log('401')
  } else if (err.response && err.response.status === 403) {
    ElMessage.error('权限不足')
    console.log('403')
  } else {
    ElMessage({
      message: err.response.data.msg,
      type: 'success',
      duration: 1000
    })
  }
  return Promise.reject(err)
})

export default hrequest
// 请求工具函数 v3组件写法
// export default (url, method, submitData) => {
//   // 负责发请求：请求地址，请求方式，提交的数据
//   return instance({
//     url,
//     method,
//     [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
//   })
// }
