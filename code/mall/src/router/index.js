import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '@/views/Category'
import Ssub from '@/views/Ssub'
import Shoppcar from '@/views/Shoppcar'
import categorylist from '@/views/categorylist'
import product from '@/views/product'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/category',
    neme:'category',
    component:Category
  },
  {
    path:'/ssub',
    neme:'ssub',
    component:Ssub
  },
  {
    path:'/shoppcar',
    neme:'shoppcar',
    component:Shoppcar
  },
  {
    path:'/categorylist/:id',
    name:"categorylist",
    component:categorylist,
    props:true
  },
  {
    path:'/product/:id',
    name:"product",
    component:product,
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
