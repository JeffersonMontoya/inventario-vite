<template>
  <aside>
    <div class="bg-red-50 p-6 rounded-3xl border border-red-100 sticky top-24">
      <h3 class="font-bold text-red-800 text-lg mb-4 flex items-center gap-2">
        <span class="animate-pulse">🔴</span> Faltantes Críticos
      </h3>

      <div v-if="items.length > 0" class="flex flex-col gap-3">
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400"
        >
          <div class="flex justify-between items-start mb-1">
            <span class="font-bold text-gray-800 text-sm">{{ item.name }}</span>
            <span
              class="text-xs font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-md"
              >{{ item.stock }} / {{ item.minStock || 5 }}</span
            >
          </div>
          <div
            class="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden"
          >
            <div
              class="bg-red-500 h-1.5 rounded-full transition-all duration-500"
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
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
