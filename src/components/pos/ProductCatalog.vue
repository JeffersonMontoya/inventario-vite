<template>
  <div class="lg:col-span-2 flex flex-col h-full overflow-hidden">
    <!-- Tabs Categorías -->
    <div class="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar shrink-0">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="$emit('setCategory', cat)"
        :class="[
          'whitespace-nowrap px-6 py-3 rounded-2xl font-bold text-sm transition-all transform active:scale-95',
          activeCategory === cat
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-100'
            : 'bg-white text-gray-500 hover:bg-green-50',
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Grid Productos -->
    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div
        v-if="products.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-20"
      >
        <div
          v-for="product in products"
          :key="product.id"
          @click="product.stock > 0 ? $emit('add', product) : null"
          :class="[
            'group rounded-[24px] p-4 border border-transparent transition-all duration-300 relative overflow-hidden active:scale-95',
            product.stock > 0
              ? 'bg-white cursor-pointer hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50'
              : 'bg-gray-100 cursor-not-allowed opacity-60 grayscale',
          ]"
        >
          <!-- Stock Badge -->
          <span
            :class="[
              'absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full z-20',
              product.stock > 10
                ? 'bg-green-100 text-green-700'
                : product.stock > 0
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-red-100 text-red-700',
            ]"
          >
            {{ product.stock > 0 ? product.stock + " u" : "Sin Stock" }}
          </span>

          <div
            class="relative z-10 flex flex-col h-full items-center text-center"
          >
            <div
              class="text-4xl mb-3 transform transition-transform duration-300"
              :class="product.stock > 0 ? 'group-hover:-translate-y-1' : ''"
            >
              {{ getEmoji(product.category) }}
            </div>

            <h3
              class="font-playfair font-bold text-gray-800 text-sm leading-tight mb-1 transition-colors line-clamp-2"
              :class="product.stock > 0 ? 'group-hover:text-emerald-700' : ''"
            >
              {{ product.name }}
            </h3>

            <span
              class="text-lg font-black font-poppins mt-auto"
              :class="product.stock > 0 ? 'text-emerald-600' : 'text-gray-400'"
            >
              {{ formatCurrency(product.price) }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-20 opacity-50 h-full"
      >
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-xl font-bold text-emerald-900">
          No hay productos en esta categoría
        </p>
      </div>
    </div>
  </div>
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

defineEmits(["add", "setCategory"]);

const { formatCurrency } = useFormatters();
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1fae5;
  border-radius: 4px;
}
</style>
