<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import ProductForm from "../components/products/ProductForm.vue";
import StatsDashboard from "../components/products/StatsDashboard.vue";
import {onMounted} from 'vue'
import { useProductStore } from "../stores/product";
import ProductCard from "../components/products/ProductCard.vue";

const productStore = useProductStore();


onMounted(() => {
  productStore.getProducts();
});

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
          <h2>Inventario</h2>
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
          <span class="btn-icon">＋</span> Nuevo Producto
        </button>
      </header>

      <StatsDashboard />

      <section class="products-container">
  <div v-if="productStore.loading" class="loading-state">
    Cargando inventario...
  </div>

  <div v-else-if="productStore.products.length > 0" class="products-grid">
    <ProductCard 
      v-for="product in productStore.products" 
      :key="product.id" 
      :product="product" 
    />
  </div>

  <div v-else class="empty-state">
    <p>No hay productos en el inventario. ¡Agrega el primero!</p>
  </div>
</section>

      <Transition name="fade">
        <div v-if="showForm" class="modal-overlay" @click.self="toogleForm">
          <div class="modal-content">
            <ProductForm @close="toogleForm" />
          </div>
        </div>
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

/* MODAL MODAL  */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: #1e293b;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 10px;
  animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.products-container {
  margin-top: 40px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 60px;
  color: #94a3b8;
  background: rgba(30, 41, 59, 0.2);
  border-radius: 20px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
}

.products-grid > * {
  animation: fadeIn 0.5s ease-out forwards;
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
