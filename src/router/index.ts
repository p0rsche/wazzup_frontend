import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Auth from "@/views/Auth.vue";
import Shared from '@/views/Shared.vue';
import NotFound from '@/views/NotFound.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const token = store.state.accessToken;
      // TODO also check expiresIn and compare with current date!
      if (!token) {
        next('/login')
      }
      next();
    }
  },
  {
    path: "/login",
    name: "login",
    component: Auth,
  },
  {
    path: "/register",
    name: "register",
    component: Auth,
  },
  {
    path: "/shared/:link",
    name: "shared",
    component: Shared,
  },
  {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: NotFound,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
