<template>
  <header
    class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-100 px-6 py-4 flex justify-between items-center shadow-sm"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xl shadow-lg shadow-green-200"
      >
        🍦
      </div>
      <div>
        <h1
          class="font-playfair font-bold text-2xl leading-none text-emerald-900"
        >
          Punto de Venta
        </h1>
        <p class="text-xs text-green-600 font-bold uppercase tracking-widest">
          Modo Vendedor
        </p>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex flex-col items-end">
        <p
          class="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1"
        >
          Ventas de Hoy
        </p>
        <span class="text-lg font-black text-emerald-600 font-mono">{{
          formatCurrency(sessionTotal)
        }}</span>
      </div>

      <button
        @click="$emit('report')"
        class="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-200 transition-colors flex items-center gap-2"
      >
        🕒 Reporte
      </button>

      <div class="hidden md:flex flex-col text-right">
        <span class="text-xs font-bold text-gray-700">{{ userEmail }}</span>
        <span class="text-[10px] text-green-500 uppercase tracking-widest">{{
          userStore.role
        }}</span>
      </div>
      <button
        @click="$emit('logout')"
        class="w-10 h-10 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors"
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
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useFormatters } from "../../composables/useFormatters";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

defineProps({
  userEmail: {
    type: String,
    required: true,
  },
  sessionTotal: {
    type: Number,
    default: 0,
  },
});

defineEmits(["logout", "report"]);

const { formatCurrency } = useFormatters();
</script>
