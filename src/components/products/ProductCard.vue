<template>
  <div
    class="flex flex-col gap-[15px] p-5 bg-slate-800/40 border border-white/[0.08] rounded-[20px] transition-all duration-300 hover:-translate-y-[5px] hover:bg-slate-800/60 hover:border-blue-600/50 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
  >
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center gap-2">
        <button
          v-if="userStore.role !== 'vendedor'"
          @click="handleUpdateStock(-1)"
          :disabled="product.stock <= 0"
          class="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 hover:bg-red-500/20 text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          -
        </button>

        <span
          :class="stockColorClass"
          class="font-bold text-xs px-3 py-1 rounded-full bg-opacity-10 border border-current transition-colors duration-500"
        >
          {{ product.stock > 0 ? product.stock + " unidades" : "Agotado" }}
        </span>

        <button
          v-if="userStore.role !== 'vendedor'"
          @click="handleUpdateStock(1)"
          class="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 hover:bg-emerald-500/20 text-white transition-all"
        >
          +
        </button>
      </div>
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
      v-if="userStore.role === 'admin' || userStore.role === 'bodega'"
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
import { useUserStore } from "../../stores/user";
import { computed } from "vue";

const productStore = useProductStore();

const userStore = useUserStore();

const props = defineProps({
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

const stockColorClass = computed(() => {
  if (props.product.stock <= 0) return "text-red-500 bg-red-500";
  if (props.product.stock < 5) return "text-orange-500 bg-orange-500";
  return "text-emerald-500 bg-emerald-500";
});

const handleUpdateStock = async (change) => {
  // 1. Evitar que el stock sea negativo antes de intentar la petición
  const newStock = props.product.stock + change;
  if (newStock < 0) return;

  try {
    // 2. Deshabilitar botones o mostrar carga (opcional)
    await productStore.updateProductStock(props.product.id, newStock);
  } catch (error) {
    console.error("Error al actualizar stock:", error);
    // Podrías revertir el cambio localmente si falla
  }
};
</script>
