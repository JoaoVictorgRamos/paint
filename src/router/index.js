import Vue from "vue";
import VueRouter from "vue-router";
import { isAuthenticated } from "@/router/middleware/authentication";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => {
      return import("../views/Login.vue");
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => {
      return import("../views/Register.vue");
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => {
      return import("../views/PaintList.vue");
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/paint",
    name: "paint",
    component: () => {
      return import("../views/Paint.vue");
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/paint/:id",
    name: "paint-edit",
    component: () => {
      return import("../views/Paint.vue");
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/circular-test",
    name: "paint",
    component: () => {
      return import("../views/HomeView.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
