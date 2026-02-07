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
      v-if="!cart || cart.length === 0"
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
        class="flex flex-col p-3 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all group gap-2"
      >
        <div class="flex items-center justify-between">
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
              <p class="text-[10px] text-gray-400 font-mono">
                {{ formatCurrency(item.price) }} / unidad
              </p>
            </div>
          </div>
          <button
            @click="removeFromCart(item.id)"
            class="w-6 h-6 rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors pb-0.5"
          >
            &times;
          </button>
        </div>

        <div
          class="flex items-center justify-between border-t border-gray-100 pt-2"
        >
          <div class="flex items-center gap-1">
            <!-- Edit Qty Button -->
            <button
              @click="editQuantity(item)"
              class="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-1"
            >
              <span>{{ item.quantity }}</span>
              <span class="text-[10px] opacity-40">✏️</span>
            </button>

            <!-- Quick Buttons -->
            <button
              @click="quickAdd(item, 5)"
              class="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg hover:bg-emerald-100"
            >
              +5
            </button>
            <button
              @click="quickAdd(item, 10)"
              class="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg hover:bg-emerald-100"
            >
              +10
            </button>
          </div>

          <div class="text-right">
            <span class="font-bold text-emerald-700 font-mono text-sm">{{
              formatCurrency(item.price * item.quantity)
            }}</span>
            <div
              v-if="isLowStock(item)"
              class="text-[9px] text-red-500 font-bold block animate-pulse"
            >
              Limit: {{ getActualStock(item.id) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Totals -->
    <div class="p-6 bg-gray-50 border-t border-gray-100">
      <div class="flex justify-between items-center mb-1">
        <span
          class="text-gray-500 text-[10px] font-bold uppercase tracking-wider"
          >Subtotal</span
        >
        <span class="font-mono font-bold text-gray-600 text-sm">{{
          formatCurrency(cartTotal)
        }}</span>
      </div>
      <div class="flex justify-between items-center mb-4">
        <span class="text-gray-800 text-base font-playfair font-bold"
          >Total a Pagar</span
        >
        <span class="font-mono font-black text-2xl text-emerald-600">{{
          formatCurrency(cartTotal)
        }}</span>
      </div>

      <!-- Calculadora de Cambio -->
      <div
        v-if="cart.length > 0"
        class="mb-5 p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm animate-[pop_0.2s_ease-out]"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">💵</span>
            <span
              class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter"
              >¿Cuánto recibes?</span
            >
          </div>
          <input
            v-model.number="recibo"
            type="text"
            inputmode="numeric"
            class="w-24 text-right font-mono font-bold text-emerald-700 outline-none border-b-2 border-emerald-50 focus:border-emerald-500 transition-colors bg-transparent"
            placeholder="$0.00"
          />
        </div>
        <div
          class="flex items-center justify-between border-t border-gray-50 pt-2"
        >
          <span
            class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter"
            >Vuelve de cambio</span
          >
          <span
            :class="[
              'font-mono font-black text-lg',
              cambio > 0 ? 'text-emerald-600' : 'text-gray-300',
            ]"
          >
            {{ formatCurrency(cambio) }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-3 mb-3">
        <button
          @click="handleCheckout('Efectivo')"
          :disabled="cart.length === 0 || loading || hasInsufficientStock"
          class="py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Efectivo
        </button>
        <button
          @click="handleCheckout('Tarjeta')"
          :disabled="cart.length === 0 || loading || hasInsufficientStock"
          class="py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tarjeta
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
        class="w-full py-2 text-[10px] text-gray-400 font-bold hover:text-red-500 transition-colors uppercase tracking-widest"
      >
        Limpiar Ticket
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
const recibo = ref("");

const cart = computed(() => productStore.cart || []);
const totalItems = computed(() =>
  cart.value.reduce((acc, item) => acc + (item.quantity || 0), 0),
);
const cartTotal = computed(() =>
  cart.value.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0,
  ),
);

const cambio = computed(() => {
  const val = Number(recibo.value);
  if (!val || val < cartTotal.value) return 0;
  return val - cartTotal.value;
});

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

const editQuantity = async (item) => {
  const stock = getActualStock(item.id);
  const { value: qty } = await Swal.fire({
    title: "Editar Cantidad",
    text: item.name,
    input: "number",
    inputValue: item.quantity,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    confirmButtonColor: "#059669",
    inputAttributes: {
      min: 1,
      max: stock,
      step: 1,
    },
    inputValidator: (value) => {
      if (!value || value <= 0) return "Mínimo 1 unidad";
      if (value > stock) return `Stock máximo: ${stock}`;
    },
  });

  if (qty) {
    productStore.updateCartQuantity(item.id, parseInt(qty));
  }
};

const quickAdd = (item, amount) => {
  const stock = getActualStock(item.id);
  const newQty = item.quantity + amount;
  if (newQty <= stock) {
    productStore.updateCartQuantity(item.id, newQty);
  } else {
    // Si excede, poner el máximo posible
    productStore.updateCartQuantity(item.id, stock);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Stock máximo alcanzado",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const clearCart = () => {
  productStore.clearCart();
  recibo.value = "";
};

const showTicket = (sale, method) => {
  const itemsHtml = sale.products
    .map(
      (p) => `
        <div class="flex justify-between text-xs border-b border-dashed border-gray-100 py-1">
            <span>${p.quantity}x ${p.name}</span>
            <span class="font-mono">${formatCurrency(p.price * p.quantity)}</span>
        </div>
    `,
    )
    .join("");

  const whatsappMessage = encodeURIComponent(
    `*GELATO PRO - TICKET DE VENTA*\n` +
      `--------------------------\n` +
      sale.products
        .map(
          (p) =>
            `• ${p.quantity}x ${p.name}: ${formatCurrency(p.price * p.quantity)}`,
        )
        .join("\n") +
      `\n--------------------------\n` +
      `*TOTAL: ${formatCurrency(sale.total)}*`,
  );

  Swal.fire({
    title: "🍦 Venta Exitosa",
    html: `
            <div class="text-left bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner font-sans">
                <p class="text-[10px] text-gray-400 text-center uppercase tracking-widest mb-4">GELATO PRO SYSTEM</p>
                <div class="space-y-1 mb-4">
                    ${itemsHtml}
                </div>
                <div class="flex justify-between font-black text-sm border-t border-gray-200 pt-2 mb-2">
                    <span>TOTAL</span>
                    <span class="text-emerald-600">${formatCurrency(sale.total)}</span>
                </div>
                <div class="flex justify-between text-[10px] text-gray-400 mb-6">
                    <span>Metodo: ${method}</span>
                    <span>${new Date().toLocaleTimeString()}</span>
                </div>
                <a href="https://wa.me/?text=${whatsappMessage}" target="_blank" class="block w-full py-3 bg-[#25D366] text-white rounded-xl text-center font-bold text-sm shadow-md hover:opacity-90 transition-opacity mb-2">
                    Enviar por WhatsApp 📲
                </a>
            </div>
        `,
    showConfirmButton: true,
    confirmButtonText: "Nueva Venta",
    confirmButtonColor: "#059669",
    background: "#ffffff",
  });
};

const handleCheckout = async (method) => {
  loading.value = true;
  try {
    const saleData = {
      products: [...cart.value],
      total: cartTotal.value,
      paymentMethod: method,
      userId: userStore.userData?.uid || "anon",
    };

    await productStore.processSale(method, userStore.userData?.uid || "anon");

    // Success! Show ticket
    showTicket(saleData, method);
    recibo.value = "";
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
