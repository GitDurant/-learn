// 导入vue
import Vue from 'vue'
// 导入根组件app
import App from './App.vue'
// 导入路由 router
import router from './router'
// 导入vuex
import store from './store'
// 导入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式styles
import Styles from '@/styles/index.less'
// 导入axios
import axios from 'axios'
// 将axios挂载到vue原型中
Vue.prototype.$http = axios
// 给$https 设置一个基本地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.use(ElementUI)
Vue.use(Styles)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
