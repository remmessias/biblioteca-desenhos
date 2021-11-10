import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { initializeApp } from "firebase/app"

Vue.config.productionTip = false

initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
