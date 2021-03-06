import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8000'

new Vue({
  store,
  router,
  axios,
  vuetify,
  VueCompositionAPI,
  render: h => h(App)
}).$mount('#app')
