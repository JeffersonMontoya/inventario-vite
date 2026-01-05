<template>
    <div class="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeIn_0.5s_ease-out]">
      <Transition name="fade">
        <div 
          v-if="productStore.stockMetrics.lowCount > 0"
          class="flex items-center gap-4 p-5 bg-orange-500/5 border border-orange-500/20 rounded-[20px] backdrop-blur-sm"
        >
          <div class="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 text-2xl shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            ⚠️
          </div>
          <div class="flex-1">
            <h3 class="text-orange-400 font-bold text-[15px]">Atención: Stock Bajo</h3>
            <p class="text-slate-400 text-xs mt-0.5">
              {{ productStore.stockMetrics.lowCount }} productos necesitan reposición pronto.
            </p>
          </div>
        </div>
      </Transition>
  
      <Transition name="fade">
        <div 
          v-if="productStore.stockMetrics.outCount > 0"
          class="flex items-center gap-4 p-5 bg-red-500/5 border border-red-500/20 rounded-[20px] backdrop-blur-sm"
        >
          <div class="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 text-2xl shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            🚫
          </div>
          <div class="flex-1">
            <h3 class="text-red-400 font-bold text-[15px]">Insumos Agotados</h3>
            <p class="text-slate-400 text-xs mt-0.5">
              Hay {{ productStore.stockMetrics.outCount }} productos sin existencia en bodega.
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
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  </style>