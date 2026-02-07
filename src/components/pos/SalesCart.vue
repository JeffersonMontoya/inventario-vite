<template>
  <div
    class="h-full flex flex-col bg-white rounded-[32px] shadow-2xl overflow-hidden border border-emerald-50"
  >
    <!-- Cart Header -->
    <div
      class="p-6 bg-emerald-600 text-white flex justify-between items-center"
    >
      <div>
        <h2 class="font-playfair font-bold text-xl">Ticket de Venta</h2>
        <p class="text-xs text-emerald-100 opacity-80">
          {{ new Date().toLocaleDateString() }}
        </p>
      </div>
      <div
        class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold"
      >
        {{ totalItems }}
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="cart.length === 0"
      class="flex-1 flex flex-col items-center justify-center p-8 text-gray-400 opacity-60"
    >
      <div class="text-6xl mb-4 grayscale">🛒</div>
      <p class="font-bold text-sm">El carrito está vacío</p>
      <p class="text-xs">Selecciona productos para comenzar</p>
    </div>

    <!-- Cart Items -->
    <div
      v-else
      class="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar"
    >
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all group"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm"
          >
            {{ getEmoji(item.category) }}
          </div>
          <div>
            <h4 class="font-bold text-gray-800 text-sm leading-tight">
              {{ item.name }}
            </h4>
            <div class="flex items-center gap-2">
              <p class="text-xs text-gray-500 font-mono">
                {{ formatCurrency(item.price) }} x {{ item.quantity }}
              </p>
              <span
                v-if="isLowStock(item)"
                class="text-[10px] text-red-500 font-bold bg-red-50 px-1 rounded animate-pulse"
              >
                Max: {{ getActualStock(item.id) }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="font-bold text-emerald-700 font-mono">{{
            formatCurrency(item.price * item.quantity)
          }}</span>
          <button
            @click="removeFromCart(item.id)"
            class="w-6 h-6 rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors pb-0.5"
          >
            &times;
          </button>
        </div>
      </div>
    </div>

    <!-- Footer Totals -->
    <div class="p-6 bg-gray-50 border-t border-gray-100">
      <div class="flex justify-between items-center mb-2">
        <span class="text-gray-500 text-xs font-bold uppercase tracking-wider"
          >Subtotal</span
        >
        <span class="font-mono font-bold text-gray-600">{{
          formatCurrency(cartTotal)
        }}</span>
      </div>
      <div class="flex justify-between items-center mb-6">
        <span class="text-gray-800 text-lg font-playfair font-bold"
          >Total a Pagar</span
        >
        <span class="font-mono font-black text-2xl text-emerald-600">{{
          formatCurrency(cartTotal)
        }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-3 mb-3">
        <button
          @click="processCheckout('Efectivo')"
          :disabled="cart.length === 0 || loading || hasInsufficientStock"
          class="py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-sm hover:bg-emerald-200 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          💵 Efectivo
        </button>
        <button
          @click="processCheckout('Tarjeta')"
          :disabled="cart.length === 0 || loading || hasInsufficientStock"
          class="py-3 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          💳 Tarjeta
        </button>
      </div>

      <div
        v-if="hasInsufficientStock"
        class="mb-3 p-2 bg-red-50 rounded-lg text-center animate-pulse"
      >
        <p class="text-[10px] text-red-500 font-bold uppercase">
          ⚠️ Stock insuficiente en inventario
        </p>
      </div>

      <button
        @click="clearCart"
        v-if="cart.length > 0"
        class="w-full py-2 text-xs text-red-400 font-bold hover:text-red-600 underline"
      >
        Vaciar Carrito
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../../stores/product";
import { useUserStore } from "../../stores/user";
import Swal from "sweetalert2";

const productStore = useProductStore();
const userStore = useUserStore();
const loading = ref(false);

const cart = computed(() => productStore.cart);
const totalItems = computed(() =>
  cart.value.reduce((acc, item) => acc + item.quantity, 0),
);
const cartTotal = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
);

const hasInsufficientStock = computed(() => {
  return cart.value.some((item) => {
    const dbProduct = productStore.products.find((p) => p.id === item.id);
    return dbProduct ? item.quantity > dbProduct.stock : false;
  });
});

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    val,
  );

const getEmoji = (cat) => {
  if (cat === "Helados") return "🍦";
  if (cat === "Bebidas") return "🥤";
  if (cat === "Toppings") return "🍫";
  return "📦";
};

const getActualStock = (id) => {
  const p = productStore.products.find((p) => p.id === id);
  return p ? p.stock : 0;
};

const isLowStock = (item) => {
  return item.quantity > getActualStock(item.id);
};

const removeFromCart = (id) => {
  productStore.removeFromCart(id);
};

const clearCart = () => {
  productStore.clearCart();
};

const processCheckout = async (method) => {
  loading.value = true;
  try {
    await productStore.processSale(method, userStore.userData?.uid || "anon");

    Swal.fire({
      icon: "success",
      title: "¡Venta Exitosa!",
      text: `Cobro realizado con ${method}`,
      timer: 2000,
      showConfirmButton: false,
      background: "#ecfdf5",
      color: "#065f46",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error en Venta",
      text: error.message,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>
