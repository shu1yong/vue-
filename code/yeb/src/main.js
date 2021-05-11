import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.baseurl = 'http://10.16.54.202'
Vue.prototype.LeftItem = '/allvote'
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
