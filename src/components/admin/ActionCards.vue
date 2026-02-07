<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Gestión de Inventario -->
    <div
      @click="$emit('toggleProductForm')"
      class="bg-white p-6 rounded-3xl shadow-sm border border-orange-50 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
      ></div>
      <div class="relative z-10">
        <h3 class="font-bold text-gray-800 text-lg mb-2">📦 Inventario</h3>
        <p class="text-sm text-gray-500 mb-4">
          Agrega, edita y elimina helados, toppings e insumos.
        </p>
        <button
          class="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-200 group-hover:bg-orange-600 transition-colors"
        >
          Gestionar Stock
        </button>
      </div>
    </div>

    <!-- Gestión de Roles -->
    <div
      @click="$emit('toggleAdminForm')"
      class="bg-white p-6 rounded-3xl shadow-sm border border-blue-50 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
      ></div>
      <div class="relative z-10">
        <h3 class="font-bold text-gray-800 text-lg mb-2">👥 Personal</h3>
        <p class="text-sm text-gray-500 mb-4">
          Administra los permisos para Vendedores y Bodegueros.
        </p>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 group-hover:bg-blue-700 transition-colors"
        >
          Registrar Empleado
        </button>
      </div>
    </div>

    <!-- Reporte de Mermas -->
    <div
      @click="$emit('toggleLossFilter')"
      class="bg-white p-6 rounded-3xl shadow-sm border border-red-50 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"
      ></div>
      <div class="relative z-10">
        <h3 class="font-bold text-gray-800 text-lg mb-2">📉 Mermas</h3>
        <p class="text-sm text-gray-500 mb-4">
          Visualiza pérdidas y ajustes negativos de inventario.
        </p>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-200 group-hover:bg-red-600 transition-colors"
        >
          {{ showingOnlyLosses ? "Ver Todo" : "Ver Reporte" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  showingOnlyLosses: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["toggleAdminForm", "toggleLossFilter"]);

const router = useRouter();
</script>
