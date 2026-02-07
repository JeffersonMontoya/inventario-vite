<template>
  <nav
    class="fixed w-full z-50 transition-all duration-300"
    :class="{
      'bg-white/90 backdrop-blur-md shadow-sm py-2': scrolled,
      'bg-transparent py-6': !scrolled,
    }"
  >
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div
          class="w-10 h-10 rounded-full bg-gradient-to-tr from-gelato-cone to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-lg"
        >
          G
        </div>
        <span
          class="text-2xl font-playfair font-bold text-gelato-chocolate tracking-tight"
          >GelatoPro</span
        >
      </div>
      <div
        class="hidden md:flex gap-8 items-center text-sm font-semibold text-gray-600"
      >
        <a
          href="#features"
          class="hover:text-gelato-strawberry transition-colors"
          >Características</a
        >
        <a href="#about" class="hover:text-gelato-strawberry transition-colors"
          >Nosotros</a
        >
        <a
          href="#testimonials"
          class="hover:text-gelato-strawberry transition-colors"
          >Clientes</a
        >
      </div>
      <router-link
        to="/login"
        class="px-6 py-2.5 rounded-full bg-gradient-to-r from-gelato-strawberry to-red-500 text-white font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
      >
        Ingresar
      </router-link>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  scrolled: Boolean,
});
</script>
