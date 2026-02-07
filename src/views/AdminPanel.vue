<template>
  <div class="min-h-screen bg-[#FDF4FF] font-poppins text-[#4C1D95]">
    <!-- Header Admin -->
    <header
      class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100 px-6 py-4 flex justify-between items-center shadow-lg shadow-purple-50/50"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-200"
        >
          ⚙️
        </div>
        <div>
          <h1
            class="font-playfair font-bold text-2xl leading-none text-purple-900"
          >
            Panel Maestro
          </h1>
          <p
            class="text-xs text-purple-500 font-bold uppercase tracking-widest"
          >
            Auditoría y Usuarios
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex flex-col text-right">
          <span class="text-xs font-bold text-gray-700">{{
            userStore.userData?.email
          }}</span>
          <span class="text-[10px] text-purple-500 uppercase tracking-widest"
            >Administrador</span
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
      <!-- Panel de Auditoría -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Métricas de Hoy -->
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-purple-50">
          <h2 class="text-lg font-bold font-playfair text-gray-800 mb-4">
            📊 Métricas del Día
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-purple-50 p-4 rounded-2xl">
              <p class="text-xs text-purple-600 font-bold uppercase">
                Ventas Totales
              </p>
              <h3 class="text-2xl font-black text-purple-900">
                {{ productStore.dailyMetrics.totalSales }}
              </h3>
            </div>
            <div class="bg-green-50 p-4 rounded-2xl">
              <p class="text-xs text-green-600 font-bold uppercase">
                Utilidad Neta
              </p>
              <h3 class="text-2xl font-black text-green-800">
                {{ productStore.dailyMetrics.netProfit }}
              </h3>
            </div>
            <div
              class="col-span-2 bg-gray-50 p-4 rounded-2xl flex justify-between items-center"
            >
              <div>
                <p class="text-xs text-gray-500 font-bold uppercase">
                  Ticket Promedio
                </p>
                <h3 class="text-xl font-bold text-gray-800">
                  {{ productStore.dailyMetrics.avgTicket }}
                </h3>
              </div>
              <div class="text-2xl">🧾</div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-3xl shadow-sm border border-purple-50 overflow-hidden"
        >
          <div
            class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"
          >
            <h2 class="text-lg font-bold font-playfair text-gray-800">
              🕵️ Últimos Movimientos
            </h2>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-purple-50">
                <tr>
                  <th class="px-6 py-3">Fecha</th>
                  <th class="px-6 py-3">Usuario</th>
                  <th class="px-6 py-3">Producto</th>
                  <th class="px-6 py-3 text-center">Tipo</th>
                  <th class="px-6 py-3 text-right">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="log in productStore.logs"
                  :key="log.id"
                  class="bg-white border-b hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4 font-mono text-xs">
                    {{ formatDate(log.timestamp) }}
                  </td>
                  <td class="px-6 py-4 font-bold text-purple-900">
                    {{ log.userEmail || "Desconocido" }}
                  </td>
                  <td class="px-6 py-4 text-gray-800">{{ log.productName }}</td>
                  <td class="px-6 py-4 text-center">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        getLogTypeClass(log.type),
                      ]"
                    >
                      {{ log.type }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 text-right font-mono font-bold"
                    :class="
                      log.quantity > 0 ? 'text-green-600' : 'text-red-500'
                    "
                  >
                    {{ log.quantity > 0 ? "+" : "" }}{{ log.quantity }}
                  </td>
                </tr>
                <tr v-if="productStore.logs.length === 0">
                  <td
                    colspan="5"
                    class="px-6 py-12 text-center text-gray-400 italic"
                  >
                    No hay registros recientes.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Panel de Acciones Rápidas -->
      <section class="flex flex-wrap gap-4 mb-8">
        <button
          @click="openForm(null)"
          class="bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-purple-200 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <span>＋</span> Nuevo Producto
        </button>
        <button
          @click="toogleAdminForm"
          class="bg-white text-purple-900 border border-purple-100 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <span>👥</span> Registrar Personal
        </button>
      </section>

      <!-- Inventario Rápido (Integrado) -->
      <section
        class="bg-white rounded-3xl shadow-sm border border-purple-50 p-6 mb-8"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold font-playfair text-gray-800">
            📦 Gestión de Inventario
          </h2>
          <div class="flex gap-2">
            <button
              v-for="cat in ['Todos', ...productStore.categories]"
              :key="cat"
              @click="productStore.setActiveCategory(cat)"
              :class="[
                'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                productStore.activeCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-500',
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            v-for="product in productStore.filteredProducts"
            :key="product.id"
            class="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 transition-all group relative"
          >
            <div class="flex justify-between items-start mb-2">
              <span class="text-2xl">{{ getEmoji(product.category) }}</span>
              <span
                :class="[
                  'text-[10px] font-bold px-2 py-1 rounded-full',
                  product.stock <= product.minStock
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600',
                ]"
              >
                {{ product.stock }} {{ product.unit || "u" }}
              </span>
            </div>
            <h4 class="font-bold text-gray-800 text-sm mb-1">
              {{ product.name }}
            </h4>
            <p class="text-xs text-gray-500 mb-3">
              {{ formatCurrency(product.price) }}
            </p>

            <div class="flex gap-2">
              <button
                @click="openForm(product)"
                class="flex-1 py-2 bg-white text-purple-600 text-xs font-bold rounded-lg border border-purple-100 hover:bg-purple-50"
              >
                Editar
              </button>
              <button
                @click="deleteConfirm(product.id)"
                class="px-2 py-2 text-red-400 hover:text-red-600"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Panel de Gestión -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Gestión de Inventario -->
        <div
          @click="router.push('/home')"
          class="bg-white p-6 rounded-3xl shadow-sm border border-orange-50 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
          ></div>
          <div class="relative z-10">
            <h3 class="font-bold text-gray-800 text-lg mb-2">📦 Inventario</h3>
            <p class="text-sm text-gray-500 mb-4">
              Agrega, edita y elimina helados, toppings e insumos.
            </p>
            <button
              class="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors"
            >
              Gestionar Stock
            </button>
          </div>
        </div>

        <!-- Gestión de Roles -->
        <div
          @click="toogleAdminForm"
          class="bg-white p-6 rounded-3xl shadow-sm border border-blue-50 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
          ></div>
          <div class="relative z-10">
            <h3 class="font-bold text-gray-800 text-lg mb-2">👥 Personal</h3>
            <p class="text-sm text-gray-500 mb-4">
              Administra los permisos para Vendedores y Bodegueros.
            </p>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
            >
              Registrar Empleado
            </button>
          </div>
        </div>

        <!-- Reporte de Mermas -->
        <div
          class="bg-white p-6 rounded-3xl shadow-sm border border-red-50 relative overflow-hidden group hover:shadow-md transition-all opacity-80"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
          ></div>
          <div class="relative z-10">
            <h3 class="font-bold text-gray-800 text-lg mb-2">📉 Mermas</h3>
            <p class="text-sm text-gray-500 mb-4">
              Visualiza pérdidas y ajustes negativos de inventario.
            </p>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-200 hover:bg-red-600 transition-colors"
            >
              Ver Reporte
            </button>
          </div>
        </div>
      </section>
      <!-- Modals -->
      <Transition name="fade">
        <div
          v-if="showForm"
          class="fixed inset-0 bg-purple-900/20 backdrop-blur-sm flex justify-center items-center z-[9999] p-6"
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
          class="fixed inset-0 bg-purple-900/20 backdrop-blur-sm flex justify-center items-center z-[9999] p-6"
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
import { onMounted, ref } from "vue";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import ProductForm from "../components/products/ProductForm.vue";
import AdminUserForm from "../components/admin/AdminUserForm.vue";
import Swal from "sweetalert2";

const productStore = useProductStore();
const userStore = useUserStore();
const router = useRouter();

const showForm = ref(false);
const showAdminForm = ref(false);
const selectedProduct = ref(null);

onMounted(async () => {
  await productStore.getProducts();
  await productStore.getLogs();
  await productStore.getDailyStats();
});

const formatCurrency = (val) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

const getEmoji = (cat) => {
  if (cat === "Helados") return "🍦";
  if (cat === "Bebidas") return "🥤";
  if (cat === "Toppings") return "🍫";
  return "📦";
};

const openForm = (product = null) => {
  selectedProduct.value = product;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  selectedProduct.value = null;
};

const toogleAdminForm = () => {
  showAdminForm.value = !showAdminForm.value;
};

const deleteConfirm = async (id) => {
  const result = await Swal.fire({
    title: "¿Eliminar producto?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    await productStore.deleteProducts(id);
    Swal.fire("Eliminado", "El producto ha sido borrado", "success");
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const date = timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : new Date(timestamp);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getLogTypeClass = (type) => {
  if (type === "venta") return "bg-green-100 text-green-700";
  if (type === "reabastecimiento") return "bg-blue-100 text-blue-700";
  if (type === "pérdida") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

const handleLogout = async () => {
  await userStore.logoutUser();
  router.push("/");
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
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
