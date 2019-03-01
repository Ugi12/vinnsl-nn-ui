import Vue from 'vue'
import Router from 'vue-router'
import VinnslUi from '@/components/VinnslUi'

import WellcomeUiJS from '@/components/tensorflow-js/TfJsWellcomeUi.vue'
import IrisUiJS from '@/components/tensorflow-js/TfJsIrisUi.vue'
import MnistUiJS from '@/components/tensorflow-js/TfJsMnistUi.vue'
import WineUiJS from '@/components/tensorflow-js/TfJsWineUi.vue'

import WellcomeUiPython from '@/components/tensorflow-python/TfPythonWellcomeUi.vue'
import IrisUiPython from '@/components/tensorflow-python/TfPythonIrisUi.vue'
import MnistUiPython from '@/components/tensorflow-python/TfPythonMnistUi.vue'
import WineUiPython from '@/components/tensorflow-python/TfPythonWineUi.vue'

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
      name: 'WellcomeUiJS',
      component: WellcomeUiJS
    },
    {
      path: '/tf-js-mnist',
      name: 'MnistUiJS',
      component: MnistUiJS
    },
    {
      path: '/tf-js-iris',
      name: 'IrisUiJS',
      component: IrisUiJS
    },
    {
      path: '/tf-js-wine',
      name: 'WineUiJS',
      component: WineUiJS
    },
    {
      path: '/tensorflow-python',
      name: 'WellcomeUiPython',
      component: WellcomeUiPython
    },
    {
      path: '/tf-python-mnist',
      name: 'MnistUiPython',
      component: MnistUiPython
    },
    {
      path: '/tf-python-iris',
      name: 'IrisUiPython',
      component: IrisUiPython
    },
    {
      path: '/tf-python-wine',
      name: 'WineUiPython',
      component: WineUiPython
    }
  ]
})
