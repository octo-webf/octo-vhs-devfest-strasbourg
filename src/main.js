import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-analytics'
Vue.config.productionTip = false
Vue.use(VueAnalytics, { id: 'UA-140034321-1', router })
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
