<template>
  <div class="lg:col-span-2 flex flex-col h-full overflow-hidden">
    <!-- Buscador -->
    <div class="relative mb-4 shrink-0">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        >🔍</span
      >
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        placeholder="Buscar sabor, topping o categoría..."
        class="w-full bg-white border border-gray-100 p-4 pl-12 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-emerald-50 transition-all shadow-sm"
      />
      <button
        v-if="searchQuery"
        @click="$emit('update:searchQuery', '')"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-emerald-500"
      >
        ✕
      </button>
    </div>

    <!-- Tabs Categorías -->
    <div class="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar shrink-0">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="$emit('setCategory', cat)"
        :class="[
          'whitespace-nowrap px-6 py-3 rounded-2xl font-bold text-sm transition-all transform active:scale-95 flex items-center gap-2',
          activeCategory === cat
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-100'
            : 'bg-white text-gray-500 hover:bg-green-50',
        ]"
      >
        <span>{{ cat === "Favoritos" ? "⭐" : "" }}</span>
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
          class="animate-[pop_0.3s_ease-out] relative"
        >
          <!-- Botón de Favorito -->
          <button
            @click.stop="$emit('toggleFavorite', product.id)"
            class="absolute bottom-20 right-4 z-[30] w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-orange-50 flex items-center justify-center text-xs shadow-sm hover:scale-110 transition-transform"
          >
            {{ favorites.includes(product.id) ? "🧡" : "🤍" }}
          </button>

          <div
            @click="handleAddClick(product)"
            :class="[
              'group rounded-[24px] p-4 border border-transparent transition-all duration-300 relative overflow-hidden active:scale-95 h-full',
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
                  ? 'bg-green-100 text-emerald-700'
                  : product.stock > 0
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-red-100 text-red-700',
              ]"
            >
              {{ product.stock > 0 ? product.stock + " u" : "Agotado" }}
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
                :class="
                  product.stock > 0 ? 'text-emerald-600' : 'text-gray-400'
                "
              >
                {{ formatCurrency(product.price) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-20 opacity-50 h-full"
      >
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-xl font-bold text-emerald-900">
          {{
            searchQuery
              ? "No se encontraron resultados"
              : "Categoría sin productos"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { useFormatters } from "../../composables/useFormatters";

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
  favorites: {
    type: Array,
    default: () => [],
  },
  searchQuery: {
    type: String,
    default: "",
  },
  getEmoji: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits([
  "add",
  "setCategory",
  "toggleFavorite",
  "update:searchQuery",
]);

const { formatCurrency } = useFormatters();

const handleAddClick = async (product) => {
  if (product.stock <= 0) return;

  const { value: qty } = await Swal.fire({
    title: `Agregar ${product.name}`,
    text: "¿Cuántas unidades?",
    input: "number",
    inputLabel: `Stock disponible: ${product.stock} ${product.unit || "u"}`,
    inputValue: 1,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#059669",
    inputAttributes: {
      min: 1,
      max: product.stock,
      step: 1,
    },
    inputValidator: (value) => {
      if (!value || value <= 0) {
        return "Debes ingresar al menos 1 unidad";
      }
      if (value > product.stock) {
        return `Solo hay ${product.stock} unidades disponibles`;
      }
    },
  });

  if (qty) {
    emit("add", product, parseInt(qty));
  }
};
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

@keyframes pop {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
