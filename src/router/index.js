import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {
    path: '../views/useElement',
    component: ElementUI
  }
]

const router = new VueRouter({
  routes
})

export default router
