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
Vue.use(ElementUI)
Vue.use(Styles)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
