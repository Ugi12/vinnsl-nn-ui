// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/* import App from './App' */
import Sidebar from './Sidebar'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-awesome/icons'
import 'vue-sidebar-menu/dist/vue-sidebar-menu'
import Icon from 'vue-awesome/components/Icon'
import VueFlashMessage from 'vue-flash-message'
// json tree view
import TreeView from 'vue-json-tree-view'
import VueNumeric from 'vue-numeric'
import VueMaterial from 'vue-material'

// sidebar
import VueSidebarMenu from 'vue-sidebar-menu'
// import ProgressBar from 'vue-simple-progress'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)
Vue.use(VueMaterial)
Vue.use(VueFlashMessage)

Vue.use(TreeView)

Vue.config.productionTip = false
// Vue.prototype.$vinnslBackendUrl = '//cluster.local.'
// Vue.prototype.$vinnslStorageBackendUrl = '//cluster.local.'

/*
 * LOCAL ADDRESSES
 */

Vue.prototype.$vinnslBackendUrl = 'http://localhost:8080'
Vue.prototype.$vinnslStorageBackendUrl = 'http://localhost:8081'
Vue.prototype.$vinnslBackendWorkerUrl = 'http://localhost:8084'
Vue.prototype.$vinnslBackendUrlTensorFlowJS = 'http://localhost:3000/tfjs'
Vue.prototype.$vinnslBackendUrlTensorFlowPython = 'http://localhost:4000/tfpy'

/*
 * PROD ADRESSES
 */

// var address = 'http://nn10.wst.univie.ac.at'
/*
var address = 'http://' + location.host
Vue.prototype.$vinnslBackendUrl = address
Vue.prototype.$vinnslStorageBackendUrl = address
Vue.prototype.$vinnslBackendWorkerUrl = address
Vue.prototype.$vinnslBackendUrlTensorFlowJS = address + '/tfjs'
Vue.prototype.$vinnslBackendUrlTensorFlowPython = address + '/tfpy'
*/
// Bootstrap
Vue.use(BootstrapVue)
Vue.use(VueNumeric)

// font aweseome
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#start',
  router,
  template: '<Sidebar/>',
  components: {Sidebar}
})
