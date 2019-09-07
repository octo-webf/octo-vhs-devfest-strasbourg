import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Category from './views/Category'
import Video from './views/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/videos/:categoryId',
      name: 'category',
      component: Category
    },
    {
      path: '/video/:videoId',
      name: 'video',
      component: Video
    }
  ]
})
