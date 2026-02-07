<template>
  <div class="min-h-screen bg-[#F0FDF4] font-poppins text-[#1B4D3E]">
    <POSHeader
      :user-email="userStore.userData?.email || ''"
      :session-total="sessionTotal"
      @logout="handleLogout"
      @report="showShiftReport(() => handleLogout())"
    />

    <main class="max-w-7xl mx-auto p-4 lg:p-6 pb-24 lg:pb-6">
      <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6">
        <!-- Columna Izquierda: Catálogo -->
        <ProductCatalog
          class="lg:col-span-2"
          :products="filteredProducts"
          :categories="saleCategories"
          :active-category="activeCategory"
          :favorites="favorites"
          :search-query="searchQuery"
          @update:search-query="(val) => (searchQuery = val)"
          :get-emoji="getProductEmoji"
          @add="addToCart"
          @toggle-favorite="toggleFavorite"
          @set-category="(cat) => (activeCategory = cat)"
        />

        <!-- Columna Derecha: Carrito -->
        <div class="w-full">
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
  searchQuery,
  favorites,
  sessionTotal,
  saleCategories,
  filteredProducts,
  getProductEmoji,
  addToCart,
  toggleFavorite,
  showShiftReport,
  loadProducts,
} = usePOS();

onMounted(() => {
  loadProducts();
});
</script>
