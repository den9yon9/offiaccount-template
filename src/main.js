import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/plugins/http'
import jweixin from '@/plugins/jweixin'

Vue.config.productionTip = false

Vue.use(http)
Vue.use(jweixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
