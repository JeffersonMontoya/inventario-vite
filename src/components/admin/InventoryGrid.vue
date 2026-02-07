<template>
  <section
    class="bg-white rounded-3xl shadow-sm border border-purple-50 p-6 mb-8"
  >
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
    >
      <div>
        <h2 class="text-xl font-bold font-playfair text-gray-800">
          📦 Gestión de Inventario
        </h2>
        <p
          v-if="criticalCount > 0"
          class="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 animate-pulse"
        >
          ⚠️ Tienes {{ criticalCount }} productos con stock crítico
        </p>
      </div>

      <div class="flex-1 max-w-md w-full relative">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          >🔍</span
        >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="¿Qué producto buscas?"
          class="w-full bg-gray-50 border border-gray-100 p-3 pl-12 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-purple-50 transition-all shadow-inner"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in ['Todos', 'Critico', ...categories]"
          :key="cat"
          @click="$emit('setCategory', cat)"
          :class="[
            'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all relative',
            activeCategory === cat
              ? activeCategory === 'Critico'
                ? 'bg-red-600 text-white shadow-lg shadow-red-200 ring-2 ring-red-100'
                : 'bg-purple-600 text-white shadow-lg shadow-purple-200 ring-2 ring-purple-100'
              : 'bg-white text-gray-400 border border-gray-100 hover:bg-purple-50',
          ]"
        >
          {{ cat === "Critico" ? "Crítico" : cat }}
          <span
            v-if="cat === 'Critico' && criticalCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce shadow-md"
          >
            {{ criticalCount }}
          </span>
        </button>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 transition-all group relative animate-[fadeIn_0.3s_ease-out]"
      >
        <div class="flex justify-between items-start mb-2">
          <span class="text-2xl">{{ getEmoji(product.category) }}</span>
          <span
            :class="[
              'text-[10px] font-bold px-2 py-1 rounded-full',
              product.stock <= (product.minStock || 5)
                ? 'bg-red-100 text-red-600 animate-[pulse-red_1s_infinite]'
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
import { ref, computed } from "vue";
import { useFormatters } from "../../composables/useFormatters";
import { useProductStore } from "../../stores/product";

const props = defineProps({
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

const productStore = useProductStore();
const { formatCurrency } = useFormatters();
const searchQuery = ref("");

const displayedProducts = computed(() => {
  if (!searchQuery.value) return props.products;
  const q = searchQuery.value.toLowerCase().trim();
  return props.products.filter((p) => p.name.toLowerCase().includes(q));
});

const criticalCount = computed(() => {
  return productStore.products.filter(
    (p) => Number(p.stock) <= Number(p.minStock || 5),
  ).length;
});
</script>

<style scoped>
@keyframes pulse-red {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
