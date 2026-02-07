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
        <button
          @click="showShiftReport"
          class="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-200 transition-colors flex items-center gap-2"
        >
          🕒 Cierre de Turno
        </button>

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

    <main class="max-w-7xl mx-auto p-6 h-[calc(100vh-80px)] overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <!-- Columna Izquierda: Catálogo -->
        <div class="lg:col-span-2 flex flex-col h-full overflow-hidden">
          <!-- Tabs Categorías -->
          <div
            class="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar shrink-0"
          >
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

          <!-- Grid Productos -->
          <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div
              v-if="filteredProducts.length > 0"
              class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-20"
            >
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                @click="product.stock > 0 ? addToCart(product) : null"
                :class="[
                  'group rounded-[24px] p-4 border border-transparent transition-all duration-300 relative overflow-hidden active:scale-95',
                  product.stock > 0
                    ? 'bg-white cursor-pointer hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50'
                    : 'bg-gray-100 cursor-not-allowed opacity-60 grayscale',
                ]"
              >
                <!-- Stock Badge -->
                <span
                  :class="[
                    'absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full z-20',
                    product.stock > 10
                      ? 'bg-green-100 text-green-700'
                      : product.stock > 0
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ product.stock > 0 ? product.stock + " u" : "Sin Stock" }}
                </span>

                <div
                  class="relative z-10 flex flex-col h-full items-center text-center"
                >
                  <div
                    class="text-4xl mb-3 transform transition-transform duration-300"
                    :class="
                      product.stock > 0 ? 'group-hover:-translate-y-1' : ''
                    "
                  >
                    {{ getProductEmoji(product.category) }}
                  </div>

                  <h3
                    class="font-playfair font-bold text-gray-800 text-sm leading-tight mb-1 transition-colors line-clamp-2"
                    :class="
                      product.stock > 0 ? 'group-hover:text-emerald-700' : ''
                    "
                  >
                    {{ product.name }}
                  </h3>

                  <span
                    class="text-lg font-black font-poppins mt-auto"
                    :class="
                      product.stock > 0 ? 'text-emerald-600' : 'text-gray-400'
                    "
                  >
                    {{ formatPrice(product.price) }}
                  </span>
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex flex-col items-center justify-center py-20 opacity-50 h-full"
            >
              <div class="text-6xl mb-4">🔍</div>
              <p class="text-xl font-bold text-emerald-900">
                No hay productos en esta categoría
              </p>
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Carrito -->
        <div class="h-full overflow-hidden">
          <SalesCart />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import SalesCart from "../components/pos/SalesCart.vue";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const productStore = useProductStore();
const userStore = useUserStore();
const router = useRouter();

const activeCategory = ref("Helados");
const saleCategories = ["Helados", "Bebidas", "Toppings", "Insumos"];

onMounted(() => {
  productStore.getProducts();
});

const filteredProducts = computed(() => {
  return productStore.products.filter(
    (p) => p.category === activeCategory.value,
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

const addToCart = (product) => {
  productStore.addToCart(product);
};

const showShiftReport = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch only sales of THIS user today
    const salesQuery = query(
      collection(db, "sales"),
      where("userId", "==", userStore.userData.uid),
      where("timestamp", ">=", today),
    );

    const snap = await getDocs(salesQuery);
    let cash = 0;
    let card = 0;
    let productsMap = {};

    snap.forEach((doc) => {
      const data = doc.data();
      if (data.paymentMethod === "Efectivo") cash += data.total;
      else card += data.total;

      data.products.forEach((p) => {
        productsMap[p.name] = (productsMap[p.name] || 0) + p.quantity;
      });
    });

    const topProducts = Object.entries(productsMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, qty]) => `${name} (${qty}u)`)
      .join("<br>");

    Swal.fire({
      title: "📜 Cierre de Turno",
      html: `
                <div class="text-left space-y-4">
                    <div class="p-3 bg-emerald-50 rounded-xl">
                        <p class="text-xs font-bold text-emerald-600 uppercase">Efectivo en Caja</p>
                        <p class="text-xl font-black text-emerald-900">${formatPrice(cash)}</p>
                    </div>
                    <div class="p-3 bg-blue-50 rounded-xl">
                        <p class="text-xs font-bold text-blue-600 uppercase">Ventas con Tarjeta</p>
                        <p class="text-xl font-black text-blue-900">${formatPrice(card)}</p>
                    </div>
                    <div class="mt-4">
                        <p class="text-xs font-bold text-gray-400 uppercase mb-2">Top 3 Productos</p>
                        <p class="text-sm font-bold text-gray-700">${topProducts || "Sin ventas hoy"}</p>
                    </div>
                </div>
            `,
      confirmButtonText: "Cerrar Turno y Salir",
      showCancelButton: true,
      cancelButtonText: "Continuar Vendiendo",
      confirmButtonColor: "#059669",
      background: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  } catch (e) {
    Swal.fire("Error", "No se pudo generar el reporte", "error");
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
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1fae5;
  border-radius: 4px;
}
</style>
