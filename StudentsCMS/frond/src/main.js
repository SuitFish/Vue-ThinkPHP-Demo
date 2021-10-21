import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

import './assets/css/global.css'

Vue.prototype.$ajax = axios

// 带上token

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
