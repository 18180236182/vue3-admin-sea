import localCache from '@/utils/cache'
import router from '@/router'
import { loginUser } from '@/api/login'
import { mapMenusToRoutes } from '@/utils/utlis'
import { ElMessage } from 'element-plus'

const login = ({
  namespaced: true,
  state () {
    return {
      token: '',
      userInfo: {},
      userMenus: localCache.getCache('userMenus') || []
    }
  },
  mutations: {
    // token
    changeToken (state, token) {
      state.token = token
    },

    // 用户信息
    changeUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },

    //  动态路由
    changeUserMenus (state, userMenus) {
      state.userMenus = userMenus
      /**
       * 动态添加路由
       */
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(route => {
        // 会自己添加到main的children中
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    // 登录
    async accountLoginAction ({ commit }, data) {
      // 路由
      const userMenus = [
        {
          id: 0,
          name: '协助记录',
          imgurl: '@/assets/xiezhujilu_icon@2x.png',
          path: '/main/assist'
        },
        {
          id: 1,
          name: '账号管理',
          imgurl: '@/assets/zhanghaoguanli_icon@2x.png',
          path: '/main/account'
        },
        {
          id: 2,
          name: '系统管理',
          imgurl: '@/assets/xitngguanli_icon@2x.png',
          path: '/main/system'
        }
      ]
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 发起请求
      const res = await loginUser(JSON.stringify(data))
      console.log(res)
      if (res.code === 1001) {
        commit('changeToken', res.data.token)
        localCache.setCache('token', res.data.token)
        commit('changeUserInfo', res.data)
        localCache.setCache('userInfo', res.data)
        await router.push('/main/assist')
      } else {
        ElMessage.warning(`${res.msg}`)
      }
    },

    /**
     * vuex刷新丢失token数据刷新
     * @param commit
     * @param dispatch
     */
    loadLocalCache ({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
})
export default login
