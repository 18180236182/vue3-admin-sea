import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/utlis'
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
    async accountLoginAction ({ commit }) {
      // 路由
      const userMenus = [
        {
          id: 0,
          name: '协助记录',
          path: '/main/assist'
        },
        {
          id: 1,
          name: '账号管理',
          path: '/main/account'
        },
        {
          id: 2,
          name: '系统管理',
          path: '/main/system'
        }
      ]
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      await router.push('/main/assist')
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
