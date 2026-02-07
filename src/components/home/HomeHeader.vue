<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-end">
    <div class="lg:col-span-2">
      <span
        class="text-gelato-strawberry text-xs font-bold uppercase tracking-[3px] mb-2 block"
        >Dashboard</span
      >
      <h1
        class="text-4xl md:text-5xl font-playfair font-bold text-gelato-chocolate tracking-tight mb-4"
      >
        Panel de Control
      </h1>
      <p class="text-gray-500 max-w-xl">
        Gestiona tu inventario, visualiza el valor de tu bodega y controla tus
        existencias críticas.
      </p>
    </div>

    <!-- Stats Card -->
    <div class="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <div class="flex justify-between items-start mb-2">
        <div>
          <p class="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Capital en Bodega
          </p>
          <h3 class="text-3xl font-bold text-gelato-chocolate mt-1">
            {{ formatCurrency(metrics.capitalValue) }}
          </h3>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl font-bold"
        >
          $
        </div>
      </div>
      <div class="text-xs text-gray-400">
        Costo Total:
        <span class="text-gray-600 font-semibold">{{
          formatCurrency(metrics.costValue)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFormatters } from "../../composables/useFormatters";

defineProps({
  metrics: {
    type: Object,
    required: true,
  },
});

const { formatCurrency } = useFormatters();
</script>
