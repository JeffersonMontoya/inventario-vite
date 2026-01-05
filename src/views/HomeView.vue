<template>
  <div class="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full"></div>

    <nav class="sticky top-0 z-[100] bg-[#020617]/80 backdrop-blur-xl border-b border-white/[0.05] shadow-2xl">
      <div class="max-w-[1200px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <span class="text-white font-black text-xl">I</span>
          </div>
          <h2 class="text-xl font-bold tracking-tight text-white">Inventario</h2>
        </div>

        <div class="w-full md:w-auto flex justify-between md:justify-start items-center gap-6">
          <div class="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {{ userInitial }}
            </div>
            <span class="hidden md:block text-slate-300 text-sm font-medium">
              {{ userStore.userData?.email }}
            </span>
          </div>
          <button
            @click="handleLogout"
            class="text-sm font-semibold text-blue-400 hover:text-white transition-colors duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-[1200px] mx-auto p-6 md:p-12 relative z-10">
      <header class="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 animate-[fadeIn_0.8s_ease-out]">
        <div class="text-center md:text-left">
          <span class="text-blue-500 text-xs font-black uppercase tracking-[3px] mb-2 block">Dashboard</span>
          <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Panel de Inventario
          </h1>
        </div>

        <div class="flex flex-wrap justify-center gap-4 md:justify-end w-full md:w-auto">
          <button
            v-if="userStore.role === 'admin' || userStore.role === 'bodega'"
            class="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 active:translate-y-0"
            @click="toogleForm"
          >
            <span class="text-lg">＋</span>
            <span>{{ userStore.role === "admin" ? "Nuevo Producto" : "Ingresar Mercancía" }}</span>
          </button>
          
          <button
            v-if="userStore.role === 'admin'"
            @click="toogleAdminForm"
            class="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all duration-300 border border-white/10 shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            <span>👥</span> Registrar Personal
          </button>
        </div>
      </header>

      <InventoryAlerts />

      <section class="mt-12">
        <div
          v-if="productStore.loading"
          class="flex flex-col items-center justify-center p-20 bg-white/[0.02] rounded-[32px] border border-dashed border-white/10"
        >
          <div class="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p class="text-slate-500 font-medium">Cargando inventario...</p>
        </div>

        <div
          v-else-if="productStore.products.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProductCard
            v-for="product in productStore.products"
            :key="product.id"
            :product="product"
        
          />
        </div>

        <div
          v-else
          class="text-center p-20 bg-white/[0.02] rounded-[32px] border border-dashed border-white/10"
        >
          <div class="text-5xl mb-4 opacity-50">📦</div>
          <p class="text-slate-400 font-medium">No hay productos en el inventario. ¡Agrega el primero!</p>
        </div>
      </section>

      <Transition name="fade">
        <div
          v-if="showForm"
          class="fixed inset-0 bg-[#020617]/90 backdrop-blur-md flex justify-center items-center z-[9999] p-6"
          @click.self="toogleForm"
        >
          <div class="bg-slate-900 w-full max-w-[500px] rounded-[32px] border border-white/10 shadow-2xl p-2 animate-[modalPop_0.3s_ease-out]">
            <ProductForm @close="toogleForm" />
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="showAdminForm"
          class="fixed inset-0 bg-[#020617]/90 backdrop-blur-md flex justify-center items-center z-[9999] p-6"
          @click.self="toogleAdminForm"
        >
          <div class="bg-slate-900 w-full max-w-[450px] rounded-[32px] border border-white/10 shadow-2xl animate-[modalPop_0.3s_ease-out]">
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

onMounted(() => {
  productStore.getProducts();
});

const userStore = useUserStore();
const router = useRouter();

const showForm = ref(false);
const showAdminForm = ref(false);

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

const toogleAdminForm = () => {
  showAdminForm.value = !showAdminForm.value;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.9) translateY(-20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Scrollbar estética */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #2563eb; }
</style>