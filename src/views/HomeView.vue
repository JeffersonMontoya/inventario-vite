<template>
  <div
    class="min-h-screen bg-gelato-cream text-gelato-chocolate relative overflow-hidden font-poppins pb-20"
  >
    <HomeNavbar
      :user-email="userStore.userData?.email || ''"
      :user-role="userStore.role || ''"
      @logout="handleLogout"
    />

    <main class="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
      <HomeHeader :metrics="productStore.dashboardMetrics" />

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button
          v-if="userStore.role === 'admin' || userStore.role === 'bodega'"
          class="bg-gelato-chocolate hover:bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:-translate-y-1"
          @click="openForm(null)"
        >
          <span class="text-lg">＋</span> Nuevo Producto
        </button>

        <button
          v-if="userStore.role === 'admin'"
          @click="toggleAdminForm"
          class="bg-white hover:bg-gray-50 text-gelato-chocolate px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1"
        >
          <span>👥</span> Registrar Personal
        </button>
      </div>

      <InventoryAlerts />

      <CategoryTabs
        :categories="productStore.categories"
        :active-category="productStore.activeCategory"
        @set-category="productStore.setActiveCategory"
      />

      <!-- Inventory Grid -->
      <section>
        <div v-if="productStore.loading" class="flex justify-center p-20">
          <div
            class="w-10 h-10 border-4 border-gelato-cone/30 border-t-gelato-cone rounded-full animate-spin"
          ></div>
        </div>

        <TransitionGroup
          name="list"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          v-else-if="productStore.filteredProducts.length > 0"
        >
          <ProductCard
            v-for="product in productStore.filteredProducts"
            :key="product.id"
            :product="product"
            @edit="openForm"
          />
        </TransitionGroup>

        <div v-else class="text-center p-20 opacity-50">
          <p class="text-xl">No hay productos en esta categoría.</p>
        </div>
      </section>

      <!-- Modals -->
      <Transition name="fade">
        <div
          v-if="showForm"
          class="fixed inset-0 bg-gelato-chocolate/20 backdrop-blur-sm flex justify-center items-center z-[9999] p-6"
          @click.self="closeForm"
        >
          <div class="animate-[modalPop_0.3s_ease-out]">
            <ProductForm
              :product="selectedProduct"
              @close="closeForm"
              @saved="productStore.getProducts()"
            />
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="showAdminForm"
          class="fixed inset-0 bg-gelato-chocolate/20 backdrop-blur-sm flex justify-center items-center z-[9999] p-6"
          @click.self="toggleAdminForm"
        >
          <div
            class="bg-white w-full max-w-[450px] rounded-[32px] border border-gray-100 shadow-2xl animate-[modalPop_0.3s_ease-out] p-6"
          >
            <AdminUserForm @close="toggleAdminForm" />
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import { useHome } from "../composables/useHome";

// Components
import HomeNavbar from "../components/home/HomeNavbar.vue";
import HomeHeader from "../components/home/HomeHeader.vue";
import CategoryTabs from "../components/home/CategoryTabs.vue";
import ProductForm from "../components/products/ProductForm.vue";
import ProductCard from "../components/products/ProductCard.vue";
import AdminUserForm from "../components/admin/AdminUserForm.vue";
import InventoryAlerts from "../components/admin/InventoryAlerts.vue";

const { userStore, handleLogout } = useAuth();
const {
  productStore,
  showForm,
  showAdminForm,
  selectedProduct,
  openForm,
  closeForm,
  toggleAdminForm,
  loadHomeData,
} = useHome();

onMounted(() => {
  loadHomeData();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-active {
  position: absolute;
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
