import Vue from 'vue'
import Router from 'vue-router'
import VinnslUi from '@/components/VinnslUi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VinnslUi',
      component: VinnslUi
    }
  ]
})
