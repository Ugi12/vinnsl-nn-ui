// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
// json tree view
import TreeView from 'vue-json-tree-view'

Vue.use(TreeView)

Vue.config.productionTip = false
// Vue.prototype.$vinnslBackendUrl = '//cluster.local.'
// Vue.prototype.$vinnslStorageBackendUrl = '//cluster.local.'

Vue.prototype.$vinnslBackendUrl = 'http://localhost:8080'
Vue.prototype.$vinnslStorageBackendUrl = 'http://localhost:8081'
Vue.prototype.$vinnslBackendUrlTensorFlowJS = 'http://localhost:3000'

// Bootstrap
Vue.use(BootstrapVue)

// font aweseome
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
