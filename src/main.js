import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import base from '../static/js/common.js' 
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$ui = MintUI
Vue.use(MintUI);
Vue.use(base);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
