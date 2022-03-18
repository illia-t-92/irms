import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: '',
    drawerState: false,
    alert: {
      status: false,
      type: '',
      message: '',
    },
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
    showAlert (state, data) {
      state.alert.status = true
      state.alert.type = data.alertType
      state.alert.message = data.alertMessage
    },
    dismissAlert () {
      state.alert.status = false
    }
  },
  getters: {
    drawerState: (state) => state.drawerState
  },
  actions: {
  },
  modules: {
  }
})
