import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/http'
import './plugins/element.js'
import '@/assets/css/global.styl'
import '@/assets/css/common.styl'
import '@/assets/css/typo.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
