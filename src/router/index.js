import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => {
      return import("../views/PaintList.vue");
    },
  },
  {
    path: "/paint",
    name: "paint",
    component: () => {
      return import("../views/Paint.vue");
    },
  },
  {
    path: "/paint/:id",
    name: "paint-edit",
    component: () => {
      return import("../views/Paint.vue");
    },
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
