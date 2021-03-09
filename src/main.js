import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';

Vue.config.productionTip = false;

import AuthenticationService from "@/services/AuthenticationService";
Vue.prototype.$global = {
    isAuthenticated: AuthenticationService.isAuthenticated(),
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
