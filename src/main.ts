import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./services/api";

import "tailwindcss/tailwind.css";

Vue.config.productionTip = false;

Vue.prototype.$http = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
