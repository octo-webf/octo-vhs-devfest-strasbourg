import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-analytics'
Vue.config.productionTip = false
// we should put the id in the env files to get an analytics id on each env
Vue.use(VueAnalytics, { id: 'UA-140034321-1', router })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
