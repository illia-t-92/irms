import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/mdc-light-indigo/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                        //core css
import 'primeicons/primeicons.css'                                  //icons
import 'primeflex/primeflex.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app =createApp(App)
app.use(store)
app.use(router, axios)
app.use(PrimeVue)
app.mount('#app')