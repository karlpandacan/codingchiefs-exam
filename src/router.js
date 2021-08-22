import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
/** Home(Login) Import */
import Home from './views/Home.vue'
import PokemonView from './views/PokemonView.vue'

/** Common Imports End Here */
Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false, title: 'Home' },
      component: Home
    },
    {
      path: '/:pokemon',
      name: 'pokemon-view',
      meta: { requiresAuth: false, title: 'Pokemon View' },
      component: PokemonView
    },
    {
      path: "/unauthorized",
      name: 'unauthorized',
      meta: { requiresAuth: false, title: 'Unauthorized (401)' },
      component: () => import('./views/Unauthorized.vue')
    },
    {
      path: "/*",
      name: 'pagenotfound',
      meta: { requiresAuth: false, title: 'Page Not Found (404)' },
      component: () => import('./views/PageNotFound.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = (process.env.VUE_APP_TITLE + ' - ' + to.meta.title)
  next()
})

export default router
