<template>
  <div
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
        @click="$emit('updateStock', 10)"
        class="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border-r border-gray-100"
      >
        +10
      </button>
      <button
        @click="$emit('updateStock', 50)"
        class="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border-r border-gray-100"
      >
        +50
      </button>
      <button
        @click="$emit('openManual')"
        class="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600"
      >
        Manual
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(["updateStock", "openManual"]);
</script>
