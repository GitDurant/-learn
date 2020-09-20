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
// 导入 Layout
import Layout from '@/views/layout'
// 导入Publish
import Publish from '@/views/publish'
Vue.use(VueRouter)
const routes = [
  // 给login组件设置重定向
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      { path: '/home', component: Home },
      { path: '/publish', component: Publish }
    ]
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
