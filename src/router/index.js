// router/index.js
import { createWebHistory, createRouter } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../stores/user";

const routes = [
  { path: "/", component: LoginView, meta: { guest: true } },
  { path: "/register", component: RegisterView, meta: { guest: true } },
  { path: "/home", component: HomeView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();

  // ⏳ Esperar a que Firebase esté listo
  if (!userStore.authReady) {
    await userStore.listenAuthState(); // 👈 Esperar aquí
  }

  // ✅ Proteger rutas
  if (to.meta.requiresAuth && !userStore.userData) {
    return "/";
  }

  if (to.meta.guest && userStore.userData) {
    return "/home";
  }
});

export default router;