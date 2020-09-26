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
// 导入json-bigint
import JsonBigint from 'json-bigint'
// 导入富文本编辑器文件
import VueQuillEditor from 'vue-quill-editor'
// 导入导入富文本编辑器css样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css'
// 将axios挂载到vue原型中
Vue.prototype.$http = axios // for bubble theme

Vue.use(VueQuillEditor)

// 给$https 设置一个基本地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 对服务器返回的axios数据做jsonbigint处理
axios.defaults.transformResponse = [
  function (data) {
    // 将来删除时，返回的结果为 ''，不能进行 JSONBig.parse, 会报错
    try {
      // console.log('----------jsonbigint-------------')
      // console.log(data)
      return JsonBigint.parse(data)
    } catch (error) {
      return data
    }
  }
]
// axios 拦截器
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config 里面有
  // URL
  // baseURl
  // headers authorization：·bearer${userinfo.token}
  // 设置请求拦截器
  // 获取token
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  // 判断userinfo 存在时添加
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 给响应拦截器添加逻辑代码
  // console.log('----------response------------')
  // console.log(response)
  return response.data.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
Vue.use(ElementUI)
Vue.use(Styles)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
