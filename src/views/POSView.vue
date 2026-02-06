<template>
  <div class="min-h-screen bg-[#F0FDF4] font-poppins text-[#1B4D3E]">
    <!-- Header Vendedor -->
    <header
      class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-100 px-6 py-4 flex justify-between items-center shadow-sm"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xl shadow-lg shadow-green-200"
        >
          🍦
        </div>
        <div>
          <h1
            class="font-playfair font-bold text-2xl leading-none text-emerald-900"
          >
            Punto de Venta
          </h1>
          <p class="text-xs text-green-600 font-bold uppercase tracking-widest">
            Modo Vendedor
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex flex-col text-right">
          <span class="text-xs font-bold text-gray-700">{{
            userStore.userData?.email
          }}</span>
          <span class="text-[10px] text-green-500 uppercase tracking-widest"
            >Vendedor</span
          >
        </div>
        <button
          @click="handleLogout"
          class="w-10 h-10 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-6">
      <!-- Tabs Categorías de Venta -->
      <div class="flex overflow-x-auto gap-3 pb-6 mb-2 no-scrollbar">
        <button
          v-for="cat in saleCategories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'whitespace-nowrap px-6 py-3 rounded-2xl font-bold text-sm transition-all transform active:scale-95',
            activeCategory === cat
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-100'
              : 'bg-white text-gray-500 hover:bg-green-50',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid de Productos -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          @click="handleQuickSale(product)"
          class="group bg-white rounded-[32px] p-6 cursor-pointer border border-transparent hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 relative overflow-hidden active:scale-95"
        >
          <div
            class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"
          ></div>

          <div
            class="relative z-10 flex flex-col h-full items-center text-center"
          >
            <div
              class="text-6xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-sm"
            >
              {{ getProductEmoji(product.category) }}
            </div>

            <h3
              class="font-playfair font-bold text-gray-800 text-lg leading-tight mb-2 group-hover:text-emerald-700 transition-colors"
            >
              {{ product.name }}
            </h3>

            <div class="mt-auto flex flex-col gap-1 w-full">
              <span class="text-2xl font-black text-emerald-600 font-poppins">
                {{ formatPrice(product.price) }}
              </span>
              <span
                :class="[
                  'text-xs font-bold px-3 py-1 rounded-full w-max mx-auto',
                  product.stock > 5
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                Stock: {{ product.stock }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-20 opacity-50"
      >
        <div class="text-6xl mb-4">💤</div>
        <p class="text-xl font-bold text-emerald-900">
          No hay productos disponibles para venta
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const productStore = useProductStore();
const userStore = useUserStore();
const router = useRouter();

const activeCategory = ref("Helados");
const saleCategories = ["Helados", "Bebidas", "Toppings"];

onMounted(() => {
  productStore.getProducts();
});

const filteredProducts = computed(() => {
  return productStore.products.filter(
    (p) => p.category === activeCategory.value && p.stock > 0,
  );
});

const getProductEmoji = (cat) => {
  if (cat === "Helados") return "🍦";
  if (cat === "Bebidas") return "🥤";
  if (cat === "Toppings") return "🍫";
  return "📦";
};

const formatPrice = (val) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    val,
  );

const handleQuickSale = async (product) => {
  if (product.stock <= 0) return;

  try {
    // 1 click sale flow
    await productStore.adjustStock(product, -1, "venta");

    // Toast de éxito discreto
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-center",
      showConfirmButton: false,
      timer: 1500,
      background: "#064E3B",
      color: "#fff",
    });

    Toast.fire({
      icon: "success",
      title: `¡Venta de ${product.name} registrada!`,
    });
  } catch (error) {
    Swal.fire({ icon: "error", title: "Error", text: error.message });
  }
};

const handleLogout = async () => {
  await userStore.logoutUser();
  router.push("/");
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
