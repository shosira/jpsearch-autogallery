import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import List from '../views/List.vue'
import Search from '../views/Search.vue'
import Vis from '../views/Vis.vue'
import Item from '../views/Item.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/vis',
    name: 'vis',
    component: Vis
  },
  {
    path: '/item',
    name: 'item',
    component: Item
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
})

export default router
