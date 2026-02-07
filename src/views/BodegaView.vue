<template>
  <div class="min-h-screen bg-[#F0F9FF] font-poppins text-[#1E3A8A]">
    <BodegaHeader
      :user-email="userStore.userData?.email || ''"
      @logout="handleLogout"
    />

    <main class="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Panel de Carga Rápida -->
      <ProductReception
        v-model="searchQuery"
        :products="filteredProducts"
        @updateStock="updateStock"
        @openManual="openCustomStock"
      />

      <!-- Panel de Faltantes (Prioridad) -->
      <CriticalStock :items="criticalItems" />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import { useBodega } from "../composables/useBodega";

// Components
import BodegaHeader from "../components/bodega/BodegaHeader.vue";
import ProductReception from "../components/bodega/ProductReception.vue";
import CriticalStock from "../components/bodega/CriticalStock.vue";

const { userStore, handleLogout } = useAuth();
const {
  searchQuery,
  filteredProducts,
  criticalItems,
  updateStock,
  openCustomStock,
  loadProducts,
} = useBodega();

onMounted(() => {
  loadProducts();
});
</script>
