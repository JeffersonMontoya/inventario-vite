<script setup>
import { ref } from "vue";
import { useProductStore } from "../../stores/product";

const productStore = useProductStore();

const name = ref("");
const price = ref(0);
const stock = ref(0);

const handleSubmit = async () => {
  await productStore.addProduct(name.value, price.value, stock.value);

  name.value = "";
  price.value = 0;
  stock.value = 0;
};
</script>

<template>
  <div>
    <h3>Agregar Producto</h3>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="name"
        type="text"
        placeholder="Nombre del producto"
        required
      />
      <input v-model="price" type="number" placeholder="Precio" required />
      <input v-model="stock" type="number" placeholder="Cantidad" required />
      <button type="submit" :disabled="productStore.loading">
        {{ productStore.loading ? "Guardando..." : "Guardar Producto" }}
      </button>
    </form>
  </div>
</template>
