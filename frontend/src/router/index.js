import Vue from 'vue'
import Router from 'vue-router'
import VinnslUi from '@/components/VinnslUi'
import WellcomeUi from '@/components/tensorflow-js/TfJsWellcomeUi.vue'
import IrisUi from '@/components/tensorflow-js/TfJsIrisUi.vue'
import MnistUi from '@/components/tensorflow-js/TfJsMnistUi.vue'
import WineUi from '@/components/tensorflow-js/TfJsWineUi.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/dl4j'
    },
    {
      path: '/dl4j',
      name: 'VinnslUi',
      component: VinnslUi
    },
    {
      path: '/tensorflow-js',
      name: 'WellcomeUi',
      component: WellcomeUi
    },
    {
      path: '/tf-js-mnist',
      name: 'MnistUi',
      component: MnistUi
    },
    {
      path: '/tf-js-iris',
      name: 'IrisUi',
      component: IrisUi
    },
    {
      path: '/tf-js-wine',
      name: 'WineUi',
      component: WineUi
    }
  ]
})
