import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$ui = MintUI
Vue.use(MintUI);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
