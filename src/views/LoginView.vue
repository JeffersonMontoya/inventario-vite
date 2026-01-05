<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_70%)] p-[20px]"
  >
    <div
      class="bg-[#020617] rounded-[22px] w-full max-w-[420px] p-[34px_26px] sm:p-[42px] shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)] animate-[slideUp_0.5s_ease-out]"
    >
      <div class="text-center mb-[34px]">
        <div class="inline-flex items-center justify-center mb-4 border rounded-full w-14 h-14 bg-blue-500/10 border-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-blue-500 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8-0v4h8z" />
          </svg>
        </div>
        <h1 class="text-[26px] sm:text-[30px] text-[#f9fafb] font-bold mb-[6px]">
          Panel de Control
        </h1>
        <p class="text-[#9ca3af] text-[15px]">Inicia sesión con credenciales autorizadas</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-[22px]">
        <div class="flex flex-col gap-[6px]">
          <label for="email" class="text-[13px] font-semibold text-[#cbd5f5]">
            Correo electrónico oficial
          </label>
          <input
            id="email"
            type="email"
            placeholder="nombre@empresa.com"
            v-model="email"
            required
            class="p-[14px_16px] rounded-[12px] border border-[#1e293b] bg-[#020617] text-[#f9fafb] text-[15px] outline-none transition-all duration-[0.25s] hover:border-[#334155] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.25)] placeholder:text-[#64748b]"
          />
        </div>

        <div class="flex flex-col gap-[6px]">
          <label for="password" class="text-[13px] font-semibold text-[#cbd5f5]">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="******"
            v-model="password"
            required
            class="p-[14px_16px] rounded-[12px] border border-[#1e293b] bg-[#020617] text-[#f9fafb] text-[15px] outline-none transition-all duration-[0.25s] hover:border-[#334155] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.25)] placeholder:text-[#64748b]"
          />
        </div>

        <button
          type="submit"
          class="mt-[14px] p-[15px] bg-[linear-gradient(135deg,#2563eb,#1d4ed8)] text-white border-none rounded-[14px] text-[16px] font-semibold cursor-pointer transition-all duration-[0.25s] shadow-[0_12px_25px_rgba(37,99,235,0.45)] hover:not-disabled:-translate-y-[2px] hover:not-disabled:shadow-[0_18px_35px_rgba(37,99,235,0.6)] active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          :disabled="userStore.loadingUser"
        >
          <span v-if="!userStore.loadingUser">Acceder al Sistema</span>
          <div v-else class="flex items-center gap-2">
            <svg class="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Verificando...</span>
          </div>
        </button>
      </form>

      <p class="mt-8 text-center text-[#4b5563] text-[12px]">
        Soporte técnico: contacto@tudominio.com
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Por favor, completa todos los campos.");
    return;
  }
  
  try {
    await userStore.loginUser(email.value, password.value);
    router.push("/home");
  } catch (error) {
    alert("Acceso denegado. Verifique sus credenciales o contacte al administrador.");
    console.error("Error de autenticación:", error.code);
  }
};
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>