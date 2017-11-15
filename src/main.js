import Vue from 'vue'
import axios from './assets/js/ajax'
import config from './assets/js/config'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import base from './assets/js/common.js' 
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$ui = MintUI
Vue.prototype.$config = config;
Vue.use(MintUI);
Vue.use(base);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
