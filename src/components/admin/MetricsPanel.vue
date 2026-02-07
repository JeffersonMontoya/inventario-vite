<template>
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
          {{ metrics.totalSales || 0 }}
        </h3>
      </div>
      <div class="bg-green-50 p-4 rounded-2xl">
        <p class="text-xs text-green-600 font-bold uppercase">Utilidad Neta</p>
        <h3 class="text-2xl font-black text-green-800">
          {{ metrics.netProfit || 0 }}
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
            {{ metrics.avgTicket || 0 }}
          </h3>
        </div>
        <div class="text-2xl">🧾</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  metrics: {
    type: Object,
    required: true,
  },
});
</script>
