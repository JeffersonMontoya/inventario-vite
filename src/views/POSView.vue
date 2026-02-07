<template>
  <div class="min-h-screen bg-[#F0FDF4] font-poppins text-[#1B4D3E]">
    <POSHeader
      :user-email="userStore.userData?.email || ''"
      @logout="handleLogout"
      @report="showShiftReport(() => handleLogout())"
    />

    <main class="max-w-7xl mx-auto p-6 h-[calc(100vh-80px)] overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <!-- Columna Izquierda: Catálogo -->
        <ProductCatalog
          :products="filteredProducts"
          :categories="saleCategories"
          :active-category="activeCategory"
          :get-emoji="getProductEmoji"
          @add="addToCart"
          @set-category="(cat) => (activeCategory = cat)"
        />

        <!-- Columna Derecha: Carrito -->
        <div class="h-full overflow-hidden">
          <SalesCart />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import { usePOS } from "../composables/usePOS";

// Components
import POSHeader from "../components/pos/POSHeader.vue";
import ProductCatalog from "../components/pos/ProductCatalog.vue";
import SalesCart from "../components/pos/SalesCart.vue";

const { userStore, handleLogout } = useAuth();
const {
  activeCategory,
  saleCategories,
  filteredProducts,
  getProductEmoji,
  addToCart,
  showShiftReport,
  loadProducts,
} = usePOS();

onMounted(() => {
  loadProducts();
});
</script>
