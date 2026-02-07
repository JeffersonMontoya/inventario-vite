<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gelato-cream p-6 relative overflow-hidden font-poppins text-gelato-chocolate"
  >
    <!-- Decorative background elements -->
    <div
      class="absolute top-0 right-0 w-[600px] h-[600px] bg-gelato-mint/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gelato-cone/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"
    ></div>

    <div
      class="bg-white rounded-3xl w-full max-w-[420px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative z-10 border border-white/50 backdrop-blur-sm animate-[fadeIn_0.6s_ease-out]"
    >
      <div class="text-center mb-10">
        <div
          class="inline-flex items-center justify-center mb-6 w-16 h-16 rounded-2xl bg-gradient-to-tr from-gelato-cone to-orange-400 text-white shadow-lg shadow-orange-200 transform hover:scale-110 transition-transform duration-300"
        >
          <span class="text-3xl">G</span>
        </div>
        <h1 class="text-3xl font-playfair font-bold text-gelato-chocolate mb-2">
          Bienvenido
        </h1>
        <p class="text-gray-500 text-sm">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label
            for="email"
            class="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
          >
            Correo Electrónico
          </label>
          <div class="relative group">
            <input
              id="email"
              type="email"
              placeholder="nombre@heladeria.com"
              v-model="email"
              required
              class="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400 group-hover:border-gray-300"
            />
            <div
              class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label
            for="password"
            class="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
          >
            Contraseña
          </label>
          <div class="relative group">
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              v-model="password"
              required
              class="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400 group-hover:border-gray-300"
            />
            <div
              class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400"
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8-0v4h8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="mt-4 w-full p-4 bg-gradient-to-r from-gelato-cone to-orange-500 text-white border-none rounded-xl text-lg font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          :disabled="loading"
        >
          <span v-if="!loading">Iniciar Sesión</span>
          <div v-else class="flex items-center gap-2">
            <svg
              class="w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Verificando...</span>
          </div>
        </button>
      </form>

      <div class="mt-8 pt-8 border-t border-gray-100 text-center">
        <p class="text-gray-400 text-xs">
          ¿Problemas para acceder?
          <a
            href="mailto:soporte@gelatopro.com"
            class="text-orange-500 hover:underline font-semibold"
            >Contactar Soporte</a
          >
        </p>
        <router-link
          to="/"
          class="mt-4 block text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from "../composables/useLogin";
const { email, password, handleLogin, loading } = useLogin();
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
