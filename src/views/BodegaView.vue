<template>
  <div class="min-h-screen bg-[#F0F9FF] font-poppins text-[#1E3A8A]">
    <!-- Header Bodega -->
    <header
      class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-100 px-6 py-4 flex justify-between items-center shadow-lg shadow-blue-50/50"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200"
        >
          📦
        </div>
        <div>
          <h1
            class="font-playfair font-bold text-2xl leading-none text-blue-900"
          >
            Gestión de Bodega
          </h1>
          <p class="text-xs text-blue-500 font-bold uppercase tracking-widest">
            Modo Almacén
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex flex-col text-right">
          <span class="text-xs font-bold text-gray-700">{{
            userStore.userData?.email
          }}</span>
          <span class="text-[10px] text-blue-500 uppercase tracking-widest"
            >Bodeguero</span
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

    <main class="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Panel de Carga Rápida -->
      <section class="lg:col-span-2">
        <div class="bg-white p-6 rounded-3xl shadow-md border border-blue-50">
          <h2
            class="text-xl font-bold font-playfair mb-6 flex items-center gap-2"
          >
            <span
              class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm"
              >📥</span
            >
            Recepción de Insumos
          </h2>

          <div class="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar producto (Escáner)..."
              v-model="searchQuery"
              class="flex-1 bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-mono"
            />
          </div>

          <div
            v-if="filteredProducts.length > 0"
            class="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
          >
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-md transition-all group"
            >
              <div class="flex items-center gap-4">
                <div
                  :class="[
                    'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm',
                    product.stock <= product.minStock
                      ? 'bg-orange-100 text-orange-500'
                      : 'bg-white text-gray-400',
                  ]"
                >
                  {{ product.stock <= product.minStock ? "⚠️" : "📦" }}
                </div>
                <div>
                  <h3 class="font-bold text-gray-800">{{ product.name }}</h3>
                  <p class="text-xs text-gray-400 font-mono">
                    Stock Actual: {{ product.stock }} {{ product.unit || "u" }}
                  </p>
                </div>
              </div>

              <div
                class="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  @click="updateStock(product, 10)"
                  class="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border-r border-gray-100"
                >
                  +10
                </button>
                <button
                  @click="updateStock(product, 50)"
                  class="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border-r border-gray-100"
                >
                  +50
                </button>
                <button
                  @click="openCustomStock(product)"
                  class="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                >
                  Manual
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12 text-gray-400 italic">
            No se encontraron insumos con ese nombre.
          </div>
        </div>
      </section>

      <!-- Panel de Faltantes (Prioridad) -->
      <aside>
        <div
          class="bg-red-50 p-6 rounded-3xl border border-red-100 sticky top-24"
        >
          <h3
            class="font-bold text-red-800 text-lg mb-4 flex items-center gap-2"
          >
            <span class="animate-pulse">🔴</span> Faltantes Críticos
          </h3>

          <div v-if="criticalItems.length > 0" class="flex flex-col gap-3">
            <div
              v-for="item in criticalItems"
              :key="item.id"
              class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400"
            >
              <div class="flex justify-between items-start mb-1">
                <span class="font-bold text-gray-800 text-sm">{{
                  item.name
                }}</span>
                <span
                  class="text-xs font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-md"
                  >{{ item.stock }} / {{ item.minStock || 5 }}</span
                >
              </div>
              <div
                class="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden"
              >
                <div
                  class="bg-red-500 h-1.5 rounded-full"
                  :style="{
                    width:
                      Math.min((item.stock / (item.minStock || 5)) * 100, 100) +
                      '%',
                  }"
                ></div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="text-center py-8 text-green-600 font-medium text-sm bg-green-50 rounded-xl border border-green-100"
          >
            ¡Todo en orden! No hay faltantes críticos.
          </div>
        </div>
      </aside>
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

const searchQuery = ref("");

onMounted(() => {
  productStore.getProducts();
});

const filteredProducts = computed(() => {
  const term = searchQuery.value.toLowerCase();
  // Solo mostrar Materia Prima e Insumos
  return productStore.products.filter(
    (p) =>
      (p.category === "Materia Prima" || p.category === "Insumos") &&
      p.name.toLowerCase().includes(term),
  );
});

const criticalItems = computed(() => {
  return productStore.products.filter((p) => p.stock <= (p.minStock || 5));
});

const updateStock = async (product, amount) => {
  try {
    await productStore.adjustStock(product, amount, "reabastecimiento");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      icon: "success",
      title: `+${amount} ${product.unit || "u"} a ${product.name}`,
    });
    Toast.fire();
  } catch (e) {
    Swal.fire("Error", e.message, "error");
  }
};

const openCustomStock = async (product) => {
  const { value: formValues } = await Swal.fire({
    title: `Ajuste Manual: ${product.name}`,
    html: `
      <div class="text-left space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Cantidad</label>
          <input id="swal-input-qty" type="number" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none" placeholder="Ej. 10">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Motivo del ajuste</label>
          <select id="swal-input-reason" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none">
            <option value="reabastecimiento">Reabastecimiento (+)</option>
            <option value="pérdida">Pérdida / Daño (-)</option>
            <option value="ajuste">Manual (Corrección)</option>
          </select>
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar Ajuste",
    confirmButtonColor: "#3B82F6",
    preConfirm: () => {
      const qty = document.getElementById("swal-input-qty").value;
      const reason = document.getElementById("swal-input-reason").value;
      if (!qty) {
        Swal.showValidationMessage("La cantidad es obligatoria");
      }
      return {
        qty: parseInt(qty),
        reason: reason,
      };
    },
  });

  if (formValues) {
    // Si es pérdida, invertimos el signo automáticamente
    const finalAmount =
      formValues.reason === "pérdida"
        ? -Math.abs(formValues.qty)
        : formValues.qty;
    try {
      await productStore.adjustStock(product, finalAmount, formValues.reason);
      Swal.fire({
        icon: "success",
        title: "Ajuste Procesado",
        text: `Se registraron ${finalAmount} unidades como ${formValues.reason}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  }
};

const handleLogout = async () => {
  await userStore.logoutUser();
  router.push("/");
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
