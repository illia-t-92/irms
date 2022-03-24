import Vue from 'vue'
import Vuex from 'vuex'
import alert from './modules/alert'
import form from './modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    alert,
    form
  },
  state: {
    isAuthenticated: false,
    token: '',
    drawerState: false,
  },
  mutations: {
    initializeStore(state){
      if (localStorage.getItem('token')){
        state.token=localStorage.getItem('token')
        state.isAuthenticated=true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    toggleDrawerState (state, data) {
      state.drawerState = data 
    },
  },
  getters: {
    drawerState: (state) => state.drawerState
  },
  actions: {
  }
})
