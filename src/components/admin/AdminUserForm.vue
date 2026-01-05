<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-white">Registrar Personal</h2>

      <button
        type="button"
        @click="$emit('close')"
        class="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-white transition-colors duration-300 rounded-md hover:bg-white/10"
      >
        <close-outlined style="font-size: 16px" />
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="ml-1 text-xs font-semibold text-slate-400"
          >Email del Empleado</label
        >
        <input
          v-model="email"
          type="email"
          placeholder="correo@tienda.com"
          required
          class="p-3 rounded-xl bg-[#020617] border border-white/10 text-white outline-none focus:border-emerald-500 transition-all"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="ml-1 text-xs font-semibold text-slate-400"
          >Contraseña Temporal</label
        >
        <input
          v-model="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          required
          class="p-3 rounded-xl bg-[#020617] border border-white/10 text-white outline-none focus:border-emerald-500 transition-all"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="ml-1 text-xs font-semibold text-slate-400"
          >Asignar Rol</label
        >
        <select
          v-model="role"
          class="p-3 rounded-xl bg-[#020617] border border-white/10 text-white outline-none focus:border-emerald-500 transition-all cursor-pointer"
        >
          <option value="vendedor">🛍️ Vendedor</option>
          <option value="bodega">📦 Bodega</option>
          <option value="admin">🔑 Administrador</option>
        </select>
      </div>

      <button
        type="submit"
        :disabled="userStore.loadingUser"
        class="p-3 mt-4 font-bold text-white transition-all bg-emerald-600 hover:bg-emerald-500 rounded-xl disabled:opacity-50"
      >
        {{ userStore.loadingUser ? "Creando cuenta..." : "Confirmar Registro" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
import { CloseOutlined } from '@ant-design/icons-vue';

const userStore = useUserStore();
const emit = defineEmits(["close"]);

const email = ref("");
const password = ref("");
const role = ref("vendedor");

const handleSubmit = async () => {
  try {
    await userStore.registerUser(email.value, password.value, role.value);
    alert("Usuario creado exitosamente");
    emit("close");
  } catch (error) {
    alert("Error: " + error.message);
  }
};
</script>
