import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VeeValidate from 'vee-validate';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'
Vue.use(VueMoment)
Vue.use(BootstrapVue);
Vue.use(Notifications)
Vue.use(VeeValidate);
Vue.use(VueMaterial)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
