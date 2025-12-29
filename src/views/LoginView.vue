<template>
  <div class="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_70%)] p-[20px]">
    
    <div class="bg-[#020617] rounded-[22px] w-full max-w-[420px] p-[34px_26px] sm:p-[42px] shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)] animate-[slideUp_0.5s_ease-out]">
      
      <div class="text-center mb-[34px]">
        <h1 class="text-[26px] sm:text-[30px] text-[#f9fafb] font-bold mb-[6px]">Bienvenido</h1>
        <p class="text-[#9ca3af] text-[15px]">Inicia sesión para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-[22px]">
        
        <div class="flex flex-col gap-[6px]">
          <label for="email" class="text-[13px] font-semibold text-[#cbd5f5]">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            v-model="email"
            required
            class="p-[14px_16px] rounded-[12px] border border-[#1e293b] bg-[#020617] text-[#f9fafb] text-[15px] outline-none transition-all duration-[0.25s] hover:border-[#334155] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.25)] placeholder:text-[#64748b]"
          />
        </div>

        <div class="flex flex-col gap-[6px]">
          <label for="password" class="text-[13px] font-semibold text-[#cbd5f5]">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            v-model="password"
            required
            class="p-[14px_16px] rounded-[12px] border border-[#1e293b] bg-[#020617] text-[#f9fafb] text-[15px] outline-none transition-all duration-[0.25s] hover:border-[#334155] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.25)] placeholder:text-[#64748b]"
          />
        </div>

        <button
          type="submit"
          class="mt-[14px] p-[15px] bg-[linear-gradient(135deg,#2563eb,#1d4ed8)] text-white border-none rounded-[14px] text-[16px] font-semibold cursor-pointer transition-all duration-[0.25s] shadow-[0_12px_25px_rgba(37,99,235,0.45)] hover:not-disabled:-translate-y-[2px] hover:not-disabled:shadow-[0_18px_35px_rgba(37,99,235,0.6)] active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="userStore.loadingUser"
        >
          <span v-if="!userStore.loadingUser">Ingresar</span>
          <span v-else>Ingresando...</span>
        </button>
      </form>

      <div class="mt-[32px] text-center">
        <p class="text-[#9ca3af] text-[14px] mb-[6px]">¿No tienes cuenta?</p>
        <router-link to="/register" class="text-[#3b82f6] no-underline font-semibold text-[15px] transition-all duration-[0.25s] hover:text-[#60a5fa] hover:underline">
          Regístrate aquí
        </router-link>
      </div>
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
  if (!email.value || !password.value || password.value.length < 6) {
    alert("Email obligatorio y contraseña mínimo 6 caracteres");
    return;
  }
  try {
    await userStore.loginUser(email.value, password.value);
    router.push("/home");
  } catch (error) {
    alert("Usuario no existe");
  }
};
</script>

<style>

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