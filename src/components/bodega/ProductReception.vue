<template>
  <section class="lg:col-span-2">
    <div class="bg-white p-6 rounded-3xl shadow-md border border-blue-50">
      <h2 class="text-xl font-bold font-playfair mb-6 flex items-center gap-2">
        <span
          class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm"
          >📥</span
        >
        Recepción de Insumos
      </h2>

      <div class="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar producto (Escáner)..."
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="flex-1 bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-mono"
        />
      </div>

      <div
        v-if="products.length > 0"
        class="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product"
          @updateStock="(amount) => $emit('updateStock', product, amount)"
          @openManual="$emit('openManual', product)"
        />
      </div>

      <div v-else class="text-center py-12 text-gray-400 italic">
        No se encontraron insumos con ese nombre.
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductItem from "./ProductItem.vue";

defineProps({
  products: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

defineEmits(["update:modelValue", "updateStock", "openManual"]);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
