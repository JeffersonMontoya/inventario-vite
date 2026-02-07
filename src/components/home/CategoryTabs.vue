<template>
  <div class="flex flex-wrap gap-3 mb-8 pb-4 border-b border-gray-100">
    <button
      @click="$emit('setCategory', 'Todos')"
      :class="[
        'px-5 py-2 rounded-full text-sm font-bold transition-all',
        activeCategory === 'Todos'
          ? 'bg-gelato-chocolate text-white shadow-md'
          : 'bg-white text-gray-500 hover:bg-gray-50',
      ]"
    >
      Todo
    </button>
    <button
      v-for="cat in categories"
      :key="cat"
      @click="$emit('setCategory', cat)"
      :class="[
        'px-5 py-2 rounded-full text-sm font-bold transition-all',
        activeCategory === cat
          ? 'bg-gelato-cone text-gelato-chocolate shadow-md'
          : 'bg-white text-gray-500 hover:bg-gray-50',
      ]"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: Array,
  activeCategory: String,
});
defineEmits(["setCategory"]);
</script>
