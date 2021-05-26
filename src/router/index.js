import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () =>
      import("../views/page_main.vue"),
  },
  {
    path: "/results",
    name: "PageResults",
    component: () =>
      import("../views/page_results.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
