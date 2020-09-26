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
import Publish from '@/views/article/publish'
// 导入nprogress
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入文章列表list
import List from '@/views/article/list'
// 导入评论组件
import Comment from '@/views/comment'
// 导入素材组件
import Material from '@/views/material'
// 导入用户信息组件
import User from '@/views/user'
// 导入Echarts
import Echarts from '@/views/data'
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
      { path: '/article/publish', component: Publish },
      { path: '/article/list', component: List },
      // 添加一个修改文章路由
      { path: '/article/edit/:id', component: Publish },
      // 添加一个评论路由
      { path: '/comment', component: Comment },
      // 添加素材路由
      { path: '/material', component: Material },
      // 添加用户信息路由
      { path: '/user/index', component: User },
      // 添加一个Echarts路由
      { path: '/echarts', component: Echarts }
    ]
  },
  {
    path: '/useElement',
    name: 'useElementui',
    component: ElementUI
  }
]
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  Nprogress.start()
  if (to.path !== '/login') {
    const userName = window.localStorage.getItem('userInfo')
    if (userName) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
router.afterEach((to, form) => {
  Nprogress.done()
})
export default router
