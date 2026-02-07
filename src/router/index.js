// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import LandingPage from "../views/LandingPage.vue";

import POSView from "../views/POSView.vue";
import BodegaView from "../views/BodegaView.vue";
import AdminPanel from "../views/AdminPanel.vue";

const routes = [
  { path: "/", component: LandingPage, meta: { guest: true } },
  { path: "/login", component: LoginView, meta: { guest: true } },
  { path: "/home", component: HomeView, meta: { requiresAuth: true } },

  // Nuevas Rutas Especializadas
  { path: "/pos", component: POSView, meta: { requiresAuth: true } },
  { path: "/bodega", component: BodegaView, meta: { requiresAuth: true } },
  { path: "/admin-panel", component: AdminPanel, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.user && to.meta.requiresAuth) {
    const currentUser = await userStore.listenAuthState();
    if (currentUser) {
      // Auto-redirect if trying to visit generic home
      if (to.path === "/home" || to.path === "/") {
        if (userStore.role === "vendedor") return next("/pos");
        if (userStore.role === "bodega") return next("/bodega");
        if (userStore.role === "admin") return next("/admin-panel");
      }
      next();
    } else {
      next("/login");
    }
  } else if (userStore.user && to.meta.guest) {
    if (userStore.role === "vendedor") return next("/pos");
    if (userStore.role === "bodega") return next("/bodega");
    return next("/admin-panel");
  } else {
    // Role protection
    // Vendedor only POS
    if (
      to.path !== "/pos" &&
      userStore.role === "vendedor" &&
      to.meta.requiresAuth
    )
      return next("/pos");

    // Bodega only Bodega
    if (
      to.path !== "/bodega" &&
      userStore.role === "bodega" &&
      to.meta.requiresAuth
    )
      return next("/bodega");

    // Admin generic fallback
    if (to.path === "/home" && userStore.role === "admin")
      return next("/admin-panel");

    next();
  }
});

export default router;
