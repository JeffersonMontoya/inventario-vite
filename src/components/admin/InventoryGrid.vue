<template>
  <section
    class="bg-white rounded-3xl shadow-sm border border-purple-50 p-6 mb-8"
  >
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
    >
      <h2 class="text-xl font-bold font-playfair text-gray-800">
        📦 Gestión de Inventario
      </h2>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in ['Todos', ...categories]"
          :key="cat"
          @click="$emit('setCategory', cat)"
          :class="[
            'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
            activeCategory === cat
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-500',
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 transition-all group relative"
      >
        <div class="flex justify-between items-start mb-2">
          <span class="text-2xl">{{ getEmoji(product.category) }}</span>
          <span
            :class="[
              'text-[10px] font-bold px-2 py-1 rounded-full',
              product.stock <= product.minStock
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600',
            ]"
          >
            {{ product.stock }} {{ product.unit || "u" }}
          </span>
        </div>
        <h4 class="font-bold text-gray-800 text-sm mb-1">
          {{ product.name }}
        </h4>
        <p class="text-xs text-gray-500 mb-3">
          {{ formatCurrency(product.price) }}
        </p>

        <div class="flex gap-2">
          <button
            @click="$emit('edit', product)"
            class="flex-1 py-2 bg-white text-purple-600 text-xs font-bold rounded-lg border border-purple-100 hover:bg-purple-50"
          >
            Editar
          </button>
          <button
            @click="$emit('delete', product.id)"
            class="px-2 py-2 text-red-400 hover:text-red-600"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useFormatters } from "../../composables/useFormatters";

defineProps({
  products: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  activeCategory: {
    type: String,
    required: true,
  },
  getEmoji: {
    type: Function,
    required: true,
  },
});

defineEmits(["edit", "delete", "setCategory"]);

const { formatCurrency } = useFormatters();
</script>
