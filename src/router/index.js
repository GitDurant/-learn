import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入Element
import ElementUI from '@/views/useElement'
// 导入自定义样式styles
// 导入login
import Login from '@/views/login'
// 导入 home
import Home from '@/views/home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/useElement',
    name: 'useElementui',
    component: ElementUI
  }
]

const router = new VueRouter({
  routes
})

export default router
