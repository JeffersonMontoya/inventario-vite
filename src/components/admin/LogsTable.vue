<template>
  <div
    class="bg-white rounded-3xl shadow-sm border border-purple-50 overflow-hidden"
  >
    <div
      class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"
    >
      <h2 class="text-lg font-bold font-playfair text-gray-800">
        🕵️ Últimos Movimientos
      </h2>
      <div class="flex gap-2">
        <button
          @click="$emit('export')"
          class="text-[10px] bg-white border border-purple-100 px-2 py-1 rounded-lg font-bold text-purple-600 hover:bg-purple-50 transition-colors"
          title="Descargar historial en CSV"
        >
          📥 Exportar
        </button>
      </div>
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
            v-for="log in logs"
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
          <tr v-if="logs.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-400 italic">
              No hay registros recientes.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useFormatters } from "../../composables/useFormatters";

defineProps({
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
</script>
