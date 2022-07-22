import { createStore } from 'vuex'
import login from '../store/login/login'
const store = createStore({
  modules: {
    login
  }
})

export function setupStore () {
  store.dispatch('login/loadLocalCache')
}
export default store
