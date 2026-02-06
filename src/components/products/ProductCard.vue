<template>
  <div
    class="flex flex-col gap-4 p-6 bg-white border border-gray-100 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/50 group h-full"
  >
    <div class="flex justify-between items-start">
      <!-- Badge Categoría -->
      <span
        class="bg-gray-50 text-gray-400 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider border border-gray-100"
      >
        {{ product.category || "General" }}
      </span>

      <div class="flex items-center gap-2">
        <button
          v-if="userStore.role !== 'vendedor'"
          @click="handleUpdateStock(-1)"
          :disabled="product.stock <= 0"
          class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold"
        >
          -
        </button>

        <span
          :class="stockColorClass"
          class="font-bold text-xs px-3 py-1.5 rounded-full transition-colors duration-500 flex items-center gap-1"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
          {{ product.stock }} {{ getUnitAbbr(product.unit) }}
        </span>

        <button
          v-if="userStore.role !== 'vendedor'"
          @click="handleUpdateStock(1)"
          class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-green-50 hover:text-green-500 text-gray-500 transition-all flex items-center justify-center font-bold"
        >
          +
        </button>
      </div>
    </div>

    <div class="flex-grow">
      <h3
        class="text-gelato-chocolate text-lg font-playfair font-bold mb-1 leading-tight group-hover:text-orange-500 transition-colors"
      >
        {{ product.name }}
      </h3>
      <p class="text-gray-400 text-2xl font-bold font-poppins">
        {{ formatPrice(product.price) }}
      </p>
      <button
        class="text-gray-400 hover:text-blue-500 p-2 rounded-lg transition-colors duration-200 hover:bg-blue-50"
        title="Editar"
        @click="$emit('edit', product)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <button
        class="text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors duration-200 hover:bg-red-50"
        title="Eliminar"
        @click="handleDelete(product.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../../stores/product";
import { useUserStore } from "../../stores/user";
import { computed } from "vue";
import Swal from "sweetalert2";

const productStore = useProductStore();
const userStore = useUserStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(["edit"]);

const getUnitAbbr = (unit) => {
  if (!unit) return "u";
  const map = {
    Unidad: "u",
    Litros: "L",
    Kilos: "kg",
    Gramos: "g",
  };
  return map[unit] || "u";
};

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#EF5350",
    cancelButtonColor: "#E0E0E0",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    customClass: {
      cancelButton: "text-gray-600",
    },
  });

  if (result.isConfirmed) {
    try {
      await productStore.deleteProducts(id);
      Swal.fire({
        title: "¡Eliminado!",
        text: "El producto ha sido eliminado.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el producto", "error");
    }
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const stockColorClass = computed(() => {
  const min = props.product.minStock || 5;
  if (props.product.stock <= 0) return "text-red-500 bg-red-50 border-red-100";
  if (props.product.stock <= min)
    return "text-orange-500 bg-orange-50 border-orange-100";
  return "text-green-600 bg-green-50 border-green-100";
});

const handleUpdateStock = async (change) => {
  try {
    const reason = change > 0 ? "reabastecimiento" : "venta";
    await productStore.adjustStock(props.product, change, reason);
  } catch (error) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "info",
      title: error.message,
    });
    Toast.fire();
  }
};
</script>
