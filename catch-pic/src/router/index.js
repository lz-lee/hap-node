import Vue from 'vue'
import Router from 'vue-router'
import catchPic from 'components/catchPic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'catchPic',
      component: catchPic
    }
  ]
})
