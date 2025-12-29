<template>
  <div
    class="flex flex-col gap-[15px] p-5 bg-slate-800/40 border border-white/[0.08] rounded-[20px] transition-all duration-300 hover:-translate-y-[5px] hover:bg-slate-800/60 hover:border-blue-600/50 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
  >
    <div class="flex justify-between items-center">
      <div class="text-[24px] bg-white/[0.05] p-2 rounded-xl">📦</div>
      <span
        :class="[
          'text-[12px] px-2.5 py-1 rounded-[20px] font-semibold transition-colors duration-300',
          product.stock < 5
            ? 'bg-red-500/20 text-red-400'
            : 'bg-emerald-500/20 text-emerald-400',
        ]"
      >
        {{ product.stock }} unidades
      </span>
    </div>

    <div>
      <h3 class="text-[#f9fafb] text-[18px] font-semibold mb-1">
        {{ product.name }}
      </h3>
      <p class="text-blue-400 text-[22px] font-bold">
        {{ formatPrice(product.price) }}
      </p>
    </div>

    <div
      class="flex justify-end gap-2.5 mt-auto pt-[15px] border-t border-white/[0.05]"
    >
      <button
        class="bg-none border-none cursor-pointer text-[16px] p-[5px] rounded-lg transition-colors duration-200 hover:bg-white/10"
        title="Editar"
      >
        ✏️
      </button>
      <button
        class="bg-none border-none cursor-pointer text-[16px] p-[5px] rounded-lg transition-colors duration-200 hover:bg-red-500/10"
        title="Eliminar"
        @click="handleDelete(product.id)"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../../stores/product"; 

const productStore = useProductStore();

defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const handleDelete = async (id) => {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    await productStore.deleteProducts(id);
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
</script>
