<template>
  <div
    class="bg-white rounded-[32px] shadow-sm border border-purple-50 overflow-hidden"
  >
    <div class="p-6 border-b border-gray-100 bg-gray-50/50">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <h2
          class="text-lg font-bold font-playfair text-gray-800 flex items-center gap-2"
        >
          🕵️ Movimientos
        </h2>

        <!-- Filtros Dinámicos -->
        <div class="flex flex-wrap items-center gap-3 flex-1 justify-end">
          <input
            v-model="filters.date"
            type="date"
            class="text-xs p-2 bg-white border border-purple-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-200"
          />
          <input
            v-model="filters.user"
            type="text"
            placeholder="Vendedor..."
            class="text-xs p-2 bg-white border border-purple-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-200 w-32"
          />
          <input
            v-model="filters.product"
            type="text"
            placeholder="Producto..."
            class="text-xs p-2 bg-white border border-purple-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-200 w-32"
          />
          <button
            @click="$emit('export')"
            class="text-[10px] bg-purple-600 px-3 py-2 rounded-xl font-bold text-white hover:bg-purple-700 transition-colors shadow-sm"
          >
            📥 Exportar
          </button>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-[10px] text-purple-400 uppercase bg-purple-50/50">
          <tr>
            <th class="px-6 py-4">Fecha/Hora</th>
            <th class="px-6 py-4">Responsable</th>
            <th class="px-6 py-4">Producto</th>
            <th class="px-6 py-4 text-center">Operación</th>
            <th class="px-6 py-4 text-right">Cantidad</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="log in paginatedLogs"
            :key="log.id"
            class="bg-white hover:bg-purple-50/30 transition-colors group"
          >
            <td class="px-6 py-4">
              <div class="flex flex-col">
                <span class="text-gray-700 font-bold">{{
                  formatDate(log.timestamp).split(",")[0]
                }}</span>
                <span class="text-[10px] text-gray-400">{{
                  formatDate(log.timestamp).split(",")[1]
                }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-gray-600 font-medium">{{
                log.userEmail?.split("@")[0] || "Sistema"
              }}</span>
            </td>
            <td class="px-6 py-4 text-gray-800 font-medium">
              {{ log.productName }}
            </td>
            <td class="px-6 py-4 text-center">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest',
                  getLogTypeClass(log.type),
                ]"
              >
                {{ log.type }}
              </span>
            </td>
            <td
              class="px-6 py-4 text-right font-mono font-black text-base"
              :class="log.quantity > 0 ? 'text-emerald-500' : 'text-rose-500'"
            >
              {{ log.quantity > 0 ? "+" : "" }}{{ log.quantity }}
            </td>
          </tr>
          <tr v-if="filteredLogs.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-400">
              <div class="flex flex-col items-center gap-2 opacity-30">
                <span class="text-3xl">🔍</span>
                <p class="text-sm italic">
                  No se encontraron movimientos con estos filtros.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div
      v-if="totalPages > 1"
      class="p-4 border-t border-gray-50 flex justify-center items-center gap-4 bg-gray-50/30"
    >
      <button
        @click="page--"
        :disabled="page === 1"
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-purple-100 text-purple-600 disabled:opacity-30 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
      >
        ←
      </button>
      <span class="text-xs font-bold text-purple-900"
        >Página {{ page }} de {{ totalPages }}</span
      >
      <button
        @click="page++"
        :disabled="page === totalPages"
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-purple-100 text-purple-600 disabled:opacity-30 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
      >
        →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFormatters } from "../../composables/useFormatters";

const props = defineProps({
  logs: {
    type: Array,
    required: true,
  },
  getLogTypeClass: {
    type: Function,
    required: true,
  },
});

defineEmits(["export"]);

const { formatDate } = useFormatters();

const page = ref(1);
const itemsPerPage = 5;
const filters = ref({
  date: "",
  user: "",
  product: "",
});

const filteredLogs = computed(() => {
  return props.logs.filter((log) => {
    const matchesUser =
      !filters.value.user ||
      log.userEmail?.toLowerCase().includes(filters.value.user.toLowerCase());
    const matchesProduct =
      !filters.value.product ||
      log.productName
        ?.toLowerCase()
        .includes(filters.value.product.toLowerCase());

    // Date filtering
    let matchesDate = true;
    if (filters.value.date) {
      const logDate = new Date(log.timestamp?.seconds * 1000)
        .toISOString()
        .split("T")[0];
      matchesDate = logDate === filters.value.date;
    }

    return matchesUser && matchesProduct && matchesDate;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredLogs.value.length / itemsPerPage),
);

const paginatedLogs = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return filteredLogs.value.slice(start, start + itemsPerPage);
});
</script>
