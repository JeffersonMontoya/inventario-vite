<template>
  <div
    class="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-[550px] max-h-[90vh] overflow-y-auto custom-scrollbar"
  >
    <button
      type="button"
      @click="$emit('close')"
      class="absolute top-4 right-4 text-gray-400 hover:text-gelato-strawberry hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20"
    >
      <span class="text-2xl font-bold">&times;</span>
    </button>

    <h3
      class="text-gelato-chocolate mb-6 text-2xl font-playfair font-bold tracking-tight text-center"
    >
      {{ product ? "Editar Producto" : "Nuevo Producto" }}
    </h3>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
      <!-- Nombre y Categoría -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
            >Nombre</label
          >
          <input
            v-model="formData.name"
            type="text"
            placeholder="Ej. Gelato de Pistacho"
            required
            class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
            >Categoría</label
          >
          <select
            v-model="formData.category"
            required
            class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100 cursor-pointer appearance-none"
          >
            <option disabled value="">Seleccionar...</option>
            <option
              v-for="cat in productStore.categories"
              :key="cat"
              :value="cat"
            >
              {{ cat }}
            </option>
          </select>
        </div>
      </div>

      <!-- Precios y Costos -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
            >Precio Venta</label
          >
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >$</span
            >
            <input
              v-model="formData.price"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              class="bg-gray-50 border border-gray-200 text-gray-700 p-4 pl-8 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
            >Costo (Unitario)</label
          >
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >$</span
            >
            <input
              v-model="formData.costPrice"
              type="number"
              step="0.01"
              placeholder="0.00"
              class="bg-gray-50 border border-gray-200 text-gray-700 p-4 pl-8 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>
      </div>

      <!-- Stock y Unidades -->
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
            >Stock</label
          >
          <input
            v-model="formData.stock"
            type="number"
            placeholder="0"
            required
            class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
            >Mínimo</label
          >
          <input
            v-model="formData.minStock"
            type="number"
            placeholder="5"
            class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
            >Unidad</label
          >
          <select
            v-model="formData.unit"
            class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100 cursor-pointer appearance-none"
          >
            <option value="Unidad">Unidad</option>
            <option value="Litros">Litros</option>
            <option value="Kilos">Kilos</option>
            <option value="Gramos">Gramos</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        :disabled="productStore.loading"
        class="bg-gradient-to-r from-gelato-cone to-orange-500 text-white border-none p-4 rounded-xl font-bold text-base mt-2 shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span v-if="!productStore.loading">{{
          product ? "Actualizar Producto" : "Guardar Producto"
        }}</span>
        <span
          v-else
          class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
        ></span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useProductStore } from "../../stores/product";
import Swal from "sweetalert2";

const productStore = useProductStore();

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "saved"]);

const formData = reactive({
  name: "",
  category: "",
  price: null,
  costPrice: null,
  stock: null,
  minStock: 5,
  unit: "Unidad",
});

const populateForm = () => {
  if (props.product) {
    formData.name = props.product.name;
    formData.category = props.product.category || "Helados";
    formData.price = props.product.price;
    formData.costPrice = props.product.costPrice || 0;
    formData.stock = props.product.stock;
    formData.minStock = props.product.minStock || 5;
    formData.unit = props.product.unit || "Unidad";
  } else {
    // Reset defaults
    formData.name = "";
    formData.category = "Helados";
    formData.price = null;
    formData.costPrice = null;
    formData.stock = null;
    formData.minStock = 5;
    formData.unit = "Unidad";
  }
};

watch(() => props.product, populateForm, { immediate: true });

const handleSubmit = async () => {
  try {
    if (props.product) {
      await productStore.updateProduct(props.product.id, { ...formData });
      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      await productStore.addProduct({ ...formData });
      Swal.fire({
        icon: "success",
        title: "¡Creado!",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    emit("saved");
    emit("close");
  } catch (error) {
    console.error(error);
    Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar." });
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #eee;
  border-radius: 10px;
}
</style>
