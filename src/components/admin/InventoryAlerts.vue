<template>
  <div
    class="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeIn_0.5s_ease-out]"
  >
    <Transition name="fade">
      <div
        v-if="productStore.dashboardMetrics.lowCount > 0"
        class="flex items-center gap-4 p-5 bg-orange-50 border border-orange-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold"
        >
          ⚠️
        </div>
        <div class="flex-1">
          <h3 class="text-orange-800 font-bold text-sm uppercase tracking-wide">
            Stock Bajo
          </h3>
          <p class="text-gray-500 text-sm mt-0.5">
            {{ productStore.dashboardMetrics.lowCount }} productos necesitan
            reposición.
          </p>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        v-if="productStore.dashboardMetrics.outCount > 0"
        class="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold"
        >
          🚫
        </div>
        <div class="flex-1">
          <h3 class="text-red-800 font-bold text-sm uppercase tracking-wide">
            Agotado
          </h3>
          <p class="text-gray-500 text-sm mt-0.5">
            Hay {{ productStore.dashboardMetrics.outCount }} productos sin
            existencia.
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useProductStore } from "../../stores/product";
const productStore = useProductStore();
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
</style>
