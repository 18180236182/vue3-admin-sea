/**
 * http请求 --class封装逻辑性会更强 -需要用 new 关键字实例出来
 * 对拦截器进行了三次处理 --封装了
 * 所有实例都有的拦截器（项目复杂，beseurl不同都会有的全局拦截 也就是说两个new实例共有的拦截器），
 * 每个实例对应的拦截器（项目复杂，beseurl不同 使用不同的实例 也就是说两个new实例不同的拦截器），
 * 每一个请求的单独拦截器（项目复杂，beseurl不同 使用不同的实例 对单独的get，post，delet 的单独的拦截器 -- 例如说返回的不是json格式，而是一个ArrayBuffer格式 就可以使用响应拦截器进行数据处理）
 */

// AXIOS 提供的类型
import axios from 'axios'
import { ElLoading } from 'element-plus'

/**
 * 创造axios类
 */
class HttpRequest {
  // 保存传过来的config（请求方式，url，携带参数）
  instance

  // 保存拦截器
  interceptors

  // loading
  loading

  // 用于创建和初始化class创建的对象
  constructor (config) {
    // 初始化axios
    this.instance = axios.create(config)

    // 对拦截器赋值
    this.interceptors = config.interceptors

    /**
     * 每个实例对应的拦截器（项目复杂，beseurl不同 使用不同的实例 也就是说两个new实例不同的拦截器），
     */
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors.requestInterceptors,
      this.interceptors.requestInterceptorsCatch
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors.responseInterceptors,
      this.interceptors.responseInterceptorsCatch
    )
    /**
     * 每个实例对应的拦截器（项目复杂，beseurl不同 使用不同的实例 也就是说两个new实例不同的拦截器），
     */

    /**
     * 所有实例都有的拦截器（项目复杂，beseurl不同都会有的全局拦截 也就是说两个new实例共有的拦截器），
     */
    this.instance.interceptors.request.use(
      (config) => {
        // 加载动画
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // console.log('所有实例共有的拦截-请求成功')
        return config
      },
      (error) => {
        // console.log('所有实例共有的拦截-请求失败')
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例共有的拦截-响应成功')
        // 关闭loading
        // eslint-disable-next-line no-unused-expressions
        this.loading?.close()
        return res
      },
      (error) => {
        // eslint-disable-next-line no-unused-expressions
        this.loading?.close()
        // console.log('所有实例共有的拦截-响应失败')
        return error
      }
    )
    /**
     * 所有实例都有的拦截器（项目复杂，beseurl不同都会有的全局拦截 也就是说两个new实例共有的拦截器），
     */
  }

  // 请求函数
  request (config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance.request(config)
        .then((res) => {
          if (config.interceptors.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  // 使用request封装 -- 不同请求类型封装
  get (config) {
    return this.request({
      ...config,
      method: 'GET'
    })
  }

  post (config) {
    return this.request({
      ...config,
      method: 'POST'
    })
  }

  delete (config) {
    return this.request({
      ...config,
      method: 'DELETE'
    })
  }

  patch (config) {
    return this.request({
      ...config,
      method: 'PATCH'
    })
  }

  /**
   *  @param config
   */
}

export default HttpRequest
