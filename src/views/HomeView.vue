<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import ProductForm from "../components/products/ProductForm.vue";

const userStore = useUserStore();
const router = useRouter();

const showForm = ref(false);

const userInitial = computed(() => {
  return userStore.userData?.email?.charAt(0).toUpperCase() || "U";
});

const handleLogout = async () => {
  try {
    await userStore.logoutUser();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

const toogleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<template>
  <div class="home-container">
    <nav class="navbar">
      <div class="nav-content">
        <div class="nav-brand">
          <h2>Mi App</h2>
        </div>
        <div class="nav-actions">
          <div class="user-info">
            <div class="user-avatar">
              {{ userInitial }}
            </div>
            <span class="user-email">{{ userStore.userData?.email }}</span>
          </div>
          <button @click="handleLogout" class="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <header class="action-header">
        <div class="text-group">
          <h1 class="welcome-title">Panel de Inventario</h1>
        </div>

        <button class="btn-primary" @click="toogleForm">
          <span class="btn-icon">{{ showForm ? "✕" : "＋" }}</span>
          {{ showForm ? "Cancelar" : "Nuevo Producto" }}
        </button>
      </header>

      <Transition name="slide">
        <section v-if="showForm" class="form-container-inline">
          <ProductForm @close="toogleForm" />
        </section>
      </Transition>
    </main>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1e293b 0%, #020617 70%);
}

.navbar {
  background: #020617;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.7);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h2 {
  color: #f9fafb;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.user-email {
  color: #cbd5f5;
  font-size: 14px;
  font-weight: 500;
}

.btn-logout {
  padding: 10px 20px;
  background: transparent;
  color: #60a5fa;
  border: 1px solid #2563eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-logout:hover {
  background: #2563eb;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.4);
}

.btn-logout:active {
  transform: translateY(0);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 48px;
  animation: fadeIn 0.6s ease-out;
}

.action-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  animation: fadeIn 0.8s ease-out;
}

.text-group {
  text-align: left;
  margin-top: 10px;
}

.btn-primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.5);
  filter: brightness(1.1);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 20px;
}
.form-container-inline {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 28px;
  margin-top: -30px;
  margin-bottom: 30px;

  width: 100%;
  max-width: 480px;
  margin-left: 0;

  overflow: hidden;
  animation: slideDown 0.4s ease-out;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-title {
  font-size: 40px;
  color: #f9fafb;
  font-weight: 700;
  margin-bottom: 10px;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .nav-actions {
    width: 100%;
    justify-content: space-between;
  }

  .user-email {
    display: none;
  }

  .welcome-title {
    font-size: 30px;
  }

  .main-content {
    padding: 36px 16px;
  }

  .action-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  .text-group {
    text-align: center;
  }
}
</style>
