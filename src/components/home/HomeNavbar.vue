<template>
  <nav
    class="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
  >
    <div
      class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full bg-gradient-to-tr from-gelato-cone to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-md"
        >
          G
        </div>
        <h2
          class="text-xl font-playfair font-bold tracking-tight text-gelato-chocolate"
        >
          GelatoPro
        </h2>
      </div>

      <div
        class="bg-gray-50 px-4 py-2 rounded-full border border-gray-100 flex items-center gap-4"
      >
        <div class="flex flex-col text-right leading-none">
          <span class="text-xs font-bold text-gray-700">{{ userEmail }}</span>
          <span class="text-[10px] text-gray-400 uppercase tracking-widest">{{
            userRole
          }}</span>
        </div>
        <button
          @click="$emit('logout')"
          class="text-xs font-bold text-red-400 hover:text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          SALIR
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  userEmail: String,
  userRole: String,
});
defineEmits(["logout"]);
</script>
