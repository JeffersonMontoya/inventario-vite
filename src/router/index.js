// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import LandingPage from "../views/LandingPage.vue";

const routes = [
  { path: "/", component: LandingPage, meta: { guest: true } },
  { path: "/login", component: LoginView, meta: { guest: true } },
  { path: "/home", component: HomeView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // Simple session check
  if (!userStore.user && to.meta.requiresAuth) {
    // If not loaded yet, wait a bit or redirect
    const currentUser = await userStore.listenAuthState();
    if (currentUser) {
      next();
    } else {
      next("/login");
    }
  } else if (userStore.user && to.meta.guest) {
    next("/home");
  } else {
    next();
  }
});

export default router;
