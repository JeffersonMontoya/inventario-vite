<template>
  <div
    class="min-h-screen flex bg-white font-poppins text-gelato-chocolate overflow-hidden"
  >
    <!-- Left Side: Branding & Visuals (Visible on desktop) -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-gelato-chocolate relative overflow-hidden items-center justify-center p-12"
    >
      <!-- Animated Background Decorations -->
      <div
        class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gelato-strawberry/20 rounded-full blur-[120px] animate-pulse"
      ></div>
      <div
        class="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gelato-mint/20 rounded-full blur-[100px] delay-1000 animate-pulse"
      ></div>

      <div class="relative z-10 text-center max-w-lg">
        <div
          class="inline-flex items-center justify-center mb-8 w-24 h-24 rounded-[32px] bg-gradient-to-tr from-gelato-cone to-orange-400 text-white shadow-2xl shadow-orange-500/20 transform hover:rotate-12 transition-transform duration-500"
        >
          <span class="text-5xl font-playfair font-bold">G</span>
        </div>
        <h2
          class="text-5xl font-playfair font-bold text-white mb-6 leading-tight"
        >
          Gestiona la <span class="text-gelato-cone">dulzura</span> de tu
          negocio
        </h2>
        <p class="text-gelato-cream/70 text-lg leading-relaxed">
          La plataforma definitiva para el control de inventario, ventas y
          equipo en heladerías artesanales.
        </p>

        <!-- Social Proof/Stats -->
        <div
          class="grid grid-cols-2 gap-8 mt-12 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
        >
          <div class="text-left">
            <div class="text-3xl font-bold text-white">500+</div>
            <div
              class="text-xs text-gelato-cream/50 uppercase tracking-widest font-bold mt-1"
            >
              Negocios
            </div>
          </div>
          <div class="text-left">
            <div class="text-3xl font-bold text-white">99.9%</div>
            <div
              class="text-xs text-gelato-cream/50 uppercase tracking-widest font-bold mt-1"
            >
              Uptime
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gelato-cream/30 relative"
    >
      <!-- Mobile Only Branding -->
      <div class="lg:hidden absolute top-8 left-8 flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg bg-gelato-chocolate flex items-center justify-center text-white font-bold"
        >
          G
        </div>
        <span class="font-playfair font-bold text-xl tracking-tight"
          >GelatoPro</span
        >
      </div>

      <div class="w-full max-w-[440px] animate-[slideIn_0.6s_ease-out]">
        <div class="mb-10 text-center lg:text-left">
          <h1
            class="text-4xl font-playfair font-bold text-gelato-chocolate mb-3"
          >
            ¡Hola de nuevo!
          </h1>
          <p class="text-gray-500">
            Ingresa tus credenciales para acceder a tu panel.
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label
              for="email"
              class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
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
                class="w-full p-4 pl-12 rounded-2xl border border-gray-200 bg-white text-gray-800 outline-none transition-all duration-300 focus:border-gelato-chocolate focus:ring-4 focus:ring-gelato-chocolate/5 placeholder:text-gray-300 shadow-sm group-hover:border-gray-300"
              />
              <div
                class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 transition-colors group-focus-within:text-gelato-chocolate"
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
              class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
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
                class="w-full p-4 pl-12 rounded-2xl border border-gray-200 bg-white text-gray-800 outline-none transition-all duration-300 focus:border-gelato-chocolate focus:ring-4 focus:ring-gelato-chocolate/5 placeholder:text-gray-300 shadow-sm group-hover:border-gray-300"
              />
              <div
                class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 transition-colors group-focus-within:text-gelato-chocolate"
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

          <div class="flex items-center justify-between mt-2">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-gelato-chocolate focus:ring-gelato-chocolate"
              />
              <span
                class="text-sm text-gray-500 group-hover:text-gray-700 transition-colors"
                >Recordarme</span
              >
            </label>
            <a
              href="#"
              class="text-sm font-bold text-gelato-chocolate hover:text-black transition-colors"
              >¿Olvidaste tu contraseña?</a
            >
          </div>

          <button
            type="submit"
            class="mt-4 w-full p-4 bg-gelato-chocolate text-white rounded-2xl text-lg font-bold shadow-xl shadow-gelato-chocolate/20 hover:shadow-2xl hover:bg-black transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 active:scale-95"
            :disabled="loading"
          >
            <span v-if="!loading">Acceder al Sistema</span>
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
              <span>Autenticando...</span>
            </div>
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-gray-100">
          <p class="text-gray-400 text-sm text-center">
            ¿No tienes una cuenta de empleado?
            <span class="text-gelato-chocolate font-bold ml-1"
              >Contacta al Administrador</span
            >
          </p>
        </div>
      </div>

      <!-- Footer Copyright -->
      <p class="absolute bottom-8 text-gray-400 text-xs">
        &copy; 2026 GelatoPro Inc. Todos los derechos reservados.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from "../composables/useLogin";
const { email, password, handleLogin, loading } = useLogin();
</script>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Custom Checkbox */
input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid #e2e8f0;
  border-radius: 0.35em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #2d2424;
  background-color: CanvasText;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
