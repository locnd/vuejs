import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import AuthenticationService from "@/services/AuthenticationService";

Vue.config.productionTip = false;

Vue.prototype.$global = {
    isAuthenticated: AuthenticationService.isAuthenticated(),
};

Vue.prototype.requireAuthentication = function() {
    if (!this.$global.isAuthenticated) {
        this.$router.push('/login');
    }
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
