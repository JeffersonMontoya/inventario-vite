<template>
  <div
    class="min-h-screen bg-gelato-cream text-gelato-chocolate relative overflow-hidden font-poppins pb-20"
  >
    <!-- Navbar -->
    <nav
      class="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div
        class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-tr from-gelato-cone to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-md"
          >
            G
          </div>
          <h2
            class="text-xl font-playfair font-bold tracking-tight text-gelato-chocolate"
          >
            GelatoPro
          </h2>
        </div>

        <div
          class="bg-gray-50 px-4 py-2 rounded-full border border-gray-100 flex items-center gap-4"
        >
          <div class="flex flex-col text-right leading-none">
            <span class="text-xs font-bold text-gray-700">{{
              userStore.userData?.email
            }}</span>
            <span class="text-[10px] text-gray-400 uppercase tracking-widest">{{
              userStore.role
            }}</span>
          </div>
          <button
            @click="handleLogout"
            class="text-xs font-bold text-red-400 hover:text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            SALIR
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
      <!-- Header & Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-end">
        <div class="lg:col-span-2">
          <span
            class="text-gelato-strawberry text-xs font-bold uppercase tracking-[3px] mb-2 block"
            >Dashboard</span
          >
          <h1
            class="text-4xl md:text-5xl font-playfair font-bold text-gelato-chocolate tracking-tight mb-4"
          >
            Panel de Control
          </h1>
          <p class="text-gray-500 max-w-xl">
            Gestiona tu inventario, visualiza el valor de tu bodega y controla
            tus existencias críticas.
          </p>
        </div>

        <!-- Stats Card -->
        <div class="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          <div class="flex justify-between items-start mb-2">
            <div>
              <p
                class="text-gray-400 text-xs font-bold uppercase tracking-wider"
              >
                Capital en Bodega
              </p>
              <h3 class="text-3xl font-bold text-gelato-chocolate mt-1">
                {{ formatCurrency(productStore.dashboardMetrics.capitalValue) }}
              </h3>
            </div>
            <div
              class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl font-bold"
            >
              $
            </div>
          </div>
          <div class="text-xs text-gray-400">
            Costo Total:
            <span class="text-gray-600 font-semibold">{{
              formatCurrency(productStore.dashboardMetrics.costValue)
            }}</span>
          </div>
        </div>
      </div>

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
          @click="toogleAdminForm"
          class="bg-white hover:bg-gray-50 text-gelato-chocolate px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1"
        >
          <span>👥</span> Registrar Personal
        </button>
      </div>

      <InventoryAlerts />

      <!-- Category Tabs -->
      <div class="flex flex-wrap gap-3 mb-8 pb-4 border-b border-gray-100">
        <button
          @click="productStore.setActiveCategory('Todos')"
          :class="[
            'px-5 py-2 rounded-full text-sm font-bold transition-all',
            productStore.activeCategory === 'Todos'
              ? 'bg-gelato-chocolate text-white shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-50',
          ]"
        >
          Todo
        </button>
        <button
          v-for="cat in productStore.categories"
          :key="cat"
          @click="productStore.setActiveCategory(cat)"
          :class="[
            'px-5 py-2 rounded-full text-sm font-bold transition-all',
            productStore.activeCategory === cat
              ? 'bg-gelato-cone text-gelato-chocolate shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-50',
          ]"
        >
          {{ cat }}
        </button>
      </div>

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
          @click.self="toogleAdminForm"
        >
          <div
            class="bg-white w-full max-w-[450px] rounded-[32px] border border-gray-100 shadow-2xl animate-[modalPop_0.3s_ease-out] p-6"
          >
            <AdminUserForm @close="toogleAdminForm" />
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import ProductForm from "../components/products/ProductForm.vue";
import { useProductStore } from "../stores/product";
import ProductCard from "../components/products/ProductCard.vue";
import AdminUserForm from "../components/admin/AdminUserForm.vue";
import InventoryAlerts from "../components/admin/InventoryAlerts.vue";

const productStore = useProductStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  await productStore.getProducts();
  productStore.setActiveCategory("Helados"); // Default tab
});

const showForm = ref(false);
const showAdminForm = ref(false);
const selectedProduct = ref(null);

const formatCurrency = (val) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

const handleLogout = async () => {
  try {
    await userStore.logoutUser();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

const openForm = (product = null) => {
  selectedProduct.value = product;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  setTimeout(() => {
    selectedProduct.value = null;
  }, 300);
};

const toogleAdminForm = () => {
  showAdminForm.value = !showAdminForm.value;
};
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
  position: absolute; /* Ensures smooth removal */
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
