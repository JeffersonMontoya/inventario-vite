<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_70%)]"
  >
    <nav
      class="sticky top-0 z-[100] bg-[#020617] border-b border-white/5 shadow-[0_6px_25px_rgba(0,0,0,0.7)]"
    >
      <div
        class="max-w-[1200px] mx-auto px-6 py-[18px] flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="text-[#f9fafb]">
          <h2 class="text-[22px] font-bold tracking-[0.5px]">Inventario</h2>
        </div>

        <div
          class="w-full md:w-auto flex justify-between md:justify-start items-center gap-[18px]"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-[42px] height-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-center font-bold text-[18px]"
            >
              {{ userInitial }}
            </div>
            <span class="hidden md:block text-[#cbd5f5] text-sm font-medium">{{
              userStore.userData?.email
            }}</span>
          </div>
          <button
            @click="handleLogout"
            class="px-5 py-2.5 bg-transparent text-[#60a5fa] border border-[#2563eb] rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-250 hover:bg-[#2563eb] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(37,99,235,0.4)] active:translate-y-0"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-[1200px] mx-auto p-[36px_16px] md:p-[48px_24px]">
      <header
        class="flex flex-col md:flex-row justify-between items-center mb-10 gap-5 text-center md:text-left animate-[fadeIn_0.8s_ease-out]"
      >
        <div class="mt-2.5">
          <h1
            class="text-[30px] md:text-[40px] text-[#f9fafb] font-bold mb-2.5"
          >
            Panel de Inventario
          </h1>
        </div>

        <div
          class="flex flex-wrap justify-center w-full gap-4 md:justify-end md:w-auto"
        >
          <button
            class="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white px-6 py-3 rounded-xl font-bold text-[15px] flex items-center gap-2.5 transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 hover:shadow-[0_20px_25px_-5px_rgba(37,99,235,0.5)] hover:brightness-110 active:translate-y-0"
            @click="toogleForm"
          >
            <span class="text-[20px]">＋</span> Nuevo Producto
          </button>

          <button
            v-if="userStore.role === 'admin'"
            @click="toogleAdminForm"
            class="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-[15px] flex items-center gap-2.5 transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 hover:shadow-[0_20px_25px_-5px_rgba(16,185,129,0.5)] hover:brightness-110 active:translate-y-0"
          >
            <span class="text-[20px]">👥</span> Gestionar Personal
          </button>
        </div>
      </header>
      <p class="text-white">
        Tu rol actual es: {{ userStore.role || "Sin rol asignado" }}
      </p>

      <section class="mt-10">
        <div
          v-if="productStore.loading"
          class="text-center p-[60px] color-[#94a3b8] bg-[#1e293b]/20 rounded-[20px] border border-dashed border-white/10"
        >
          Cargando inventario...
        </div>

        <div
          v-else-if="productStore.products.length > 0"
          class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[25px]"
        >
          <ProductCard
            v-for="product in productStore.products"
            :key="product.id"
            :product="product"
            class="animate-[fadeIn_0.5s_ease-out_forwards]"
          />
        </div>

        <div
          v-else
          class="text-center p-[60px] text-[#94a3b8] bg-[#1e293b]/20 rounded-[20px] border border-dashed border-white/10"
        >
          <p>No hay productos en el inventario. ¡Agrega el primero!</p>
        </div>
      </section>

      <Transition name="fade">
        <div
          v-if="showForm"
          class="fixed inset-0 bg-[#020617]/85 backdrop-blur-[6px] flex justify-center items-center z-[9999] p-5"
          @click.self="toogleForm"
        >
          <div
            class="bg-[#1e293b] w-full max-w-[500px] rounded-[20px] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-2.5 animate-[modalPop_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <ProductForm @close="toogleForm" />
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="showAdminForm"
          class="fixed inset-0 bg-[#020617]/85 backdrop-blur-[6px] flex justify-center items-center z-[9999] p-5"
          @click.self="toggleAdminForm"
        >
          <div
            class="bg-[#1e293b] w-full max-w-[450px] rounded-[20px] border border-white/10 shadow-2xl animate-[modalPop_0.3s_ease-out]"
          >
            <AdminUserForm @close="toggleAdminForm" />
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
</style>
