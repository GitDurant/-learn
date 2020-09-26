import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    changeuserInfo (state, newUse) {
      state.userInfo.name = newUse.name
      state.userInfo.intro = newUse.intro
      state.userInfo.email = newUse.email
      window.localStorage.setItem('userInfo', (JSON.stringify(state.userInfo)))
    },
    changeUserInfoImg (state, newImg) {
      state.userInfo.photo = newImg
      // 将数据同步到 localStorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      window.localStorage.setItem('userInfo', JSON.stringify(state, userInfo))
    }
  }
})
