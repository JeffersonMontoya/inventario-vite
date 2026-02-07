<template>
  <header
    class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-100 px-6 py-4 flex justify-between items-center shadow-lg shadow-blue-50/50"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200"
      >
        📦
      </div>
      <div>
        <h1 class="font-playfair font-bold text-2xl leading-none text-blue-900">
          Gestión de Bodega
        </h1>
        <p class="text-xs text-blue-500 font-bold uppercase tracking-widest">
          Modo Almacén
        </p>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="hidden md:flex flex-col text-right">
        <span class="text-xs font-bold text-gray-700">{{ userEmail }}</span>
        <span class="text-[10px] text-blue-500 uppercase tracking-widest"
          >Bodeguero</span
        >
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
defineProps({
  userEmail: {
    type: String,
    required: true,
  },
});

defineEmits(["logout"]);
</script>
