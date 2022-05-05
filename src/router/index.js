import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PreView from "../views/PreView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/view",
      name: "view",
      component: PreView,
    },
  ],
});

export default router;
