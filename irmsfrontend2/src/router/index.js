import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Records from '../views/Records.vue'
import RecordDetails from '../views/RecordDetails.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    
    path: '/' ,
    name: 'main',
    component: Main,
    meta: {
      requireLogin: true
    },
    children:[
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          requireLogin: true
        },
      },
      {
        path: '/returns-list',
        name: 'records_list',
        component: Records,
        meta: {
          requireLogin: true
        },
      },
      {
        path: ':record_uuid/return-details/',
        name: 'record_details',
        component: RecordDetails,
        props: true,
        meta: {
          requireLogin: true
        },
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),  
        meta: {
          requireLogin: true
        },
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('initializeStore')
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next({ name: 'Login', query: {to: to.path } });
  } else {
    next()
  }
})

export default router
