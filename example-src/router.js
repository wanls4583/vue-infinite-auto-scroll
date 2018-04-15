import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Home
    }
  ]
})