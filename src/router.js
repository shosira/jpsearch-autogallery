import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import List from './views/List.vue'
import Search from './views/Search.vue'
import Vis from './views/Vis.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/vis',
      name: 'vis',
      component: Vis
    }
  ]
})
