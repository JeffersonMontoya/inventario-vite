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
      <section
        class="bg-white rounded-3xl shadow-sm border border-purple-50 mb-8 overflow-hidden"
      >
        <div
          class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"
        >
          <h2 class="text-lg font-bold font-playfair text-gray-800">
            🕵️ Últimos Movimientos (Auditoría)
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
                  :class="log.quantity > 0 ? 'text-green-600' : 'text-red-500'"
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
      </section>

      <!-- Panel de Gestión de Usuarios (Próximamente) -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          class="bg-white p-6 rounded-3xl shadow-sm border border-blue-50 relative overflow-hidden group hover:shadow-md transition-all"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
          ></div>
          <div class="relative z-10">
            <h3 class="font-bold text-gray-800 text-lg mb-2">
              Gestión de Roles
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              Administra los permisos de acceso para Vendedores y Bodegueros.
            </p>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
            >
              Ver Empleados
            </button>
          </div>
        </div>

        <div
          class="bg-white p-6 rounded-3xl shadow-sm border border-red-50 relative overflow-hidden group hover:shadow-md transition-all"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
          ></div>
          <div class="relative z-10">
            <h3 class="font-bold text-gray-800 text-lg mb-2">
              Reporte de Mermas
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              Visualiza las pérdidas y ajustes negativos de inventario.
            </p>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-200 hover:bg-red-600 transition-colors"
            >
              Ver Reporte
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  await productStore.getLogs();
});

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  // Check if timestamp is a Firestore Timestamp object (has seconds)
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
