import Vue from 'vue'
import Router from 'vue-router'
import VinnslUi from '@/components/VinnslUi'

import WellcomeUiJS from '@/components/tensorflow-js/TfJsWellcomeUi.vue'
import IrisUiJS from '@/components/tensorflow-js/TfJsIrisUi.vue'
import MnistTestUiJS from '@/components/tensorflow-js/TfJsMnistTestUi.vue'
import MnistTrainUiJS from '@/components/tensorflow-js/TfJsMnistTrainUi.vue'
import WineUiJS from '@/components/tensorflow-js/TfJsWineUi.vue'
import LstmUiJS from '@/components/tensorflow-js/TfJsLstmTrain.vue'

import WellcomeUiPython from '@/components/tensorflow-python/TfPythonWellcomeUi.vue'
import IrisUiPython from '@/components/tensorflow-python/TfPythonIrisUi.vue'
import MnistUiPython from '@/components/tensorflow-python/TfPythonMnistTrainUi.vue'
import MnistTestUiPython from '@/components/tensorflow-python/TfPythonMnistTestUi.vue'
import WineUiPython from '@/components/tensorflow-python/TfPythonWineUi.vue'
import LstmUiPython from '@/components/tensorflow-python/TfPythonLstmTrain.vue'

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
      path: '/tf-js-mnist-train',
      name: 'MnistTrainUiJS',
      component: MnistTrainUiJS
    },
    {
      path: '/tf-js-mnist-test',
      name: 'MnistTestUiJS',
      component: MnistTestUiJS
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
      path: '/tf-js-lstm',
      name: 'LstmUiJS',
      component: LstmUiJS
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
      path: '/tf-python-mnist-test',
      name: 'MnistTestUiPython',
      component: MnistTestUiPython
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
    },
    {
      path: '/tf-python-lstm',
      name: 'LstmUiPython',
      component: LstmUiPython
    }
  ]
})
