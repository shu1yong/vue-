import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Registe from '../views/Registe.vue'
import Allvote from '../views/Allvote.vue'
import Meinvolve from '../views/Meinvolve.vue'
import Mecreate from '../views/Mecreate.vue'
import Createvote from '../views/Createvote.vue'
import test from '../views/test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/allvote',
        name: 'Allvote',
        component: Allvote
      },
      {
        path: '/meinvolve',
        name: 'Meinvolve',
        component: Meinvolve
      },
      {
        path: '/mecreate',
        name: 'Mecreate',
        component: Mecreate
      },
      {
        path: '/createvote',
        name: 'Createvote',
        component: Createvote
      },
    ]
  },
  {
    path: '/registe',
    name: 'Registe',
    component: Registe
  },
  {
    path: '/test',
    name: 'tset',
    component: test
  },
 
]
//路由导航冗余报错（路由重复）
const originalPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
      }
const router = new VueRouter({
  routes
})

export default router
