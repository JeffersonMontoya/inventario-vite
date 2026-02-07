<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-playfair font-bold text-gelato-chocolate">
        {{ initialData ? "Editar Personal" : "Registrar Personal" }}
      </h2>

      <button
        type="button"
        @click="$emit('close')"
        class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gelato-strawberry hover:bg-red-50 rounded-full transition-colors duration-300"
      >
        <span class="text-xl font-bold">&times;</span>
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <label
          class="ml-1 text-xs font-bold text-gray-400 uppercase tracking-wider"
          >Email del Empleado</label
        >
        <input
          v-model="email"
          type="email"
          placeholder="correo@tienda.com"
          required
          :disabled="!!initialData"
          class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400 disabled:opacity-50"
        />
      </div>

      <div v-if="!initialData" class="flex flex-col gap-2">
        <label
          class="ml-1 text-xs font-bold text-gray-400 uppercase tracking-wider"
          >Contraseña Temporal</label
        >
        <div class="relative group">
          <input
            v-model="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            required
            class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label
          class="ml-1 text-xs font-bold text-gray-400 uppercase tracking-wider"
          >Asignar Rol</label
        >
        <div class="relative">
          <select
            v-model="role"
            class="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl text-sm w-full outline-none transition-all duration-300 focus:bg-white focus:border-gelato-cone focus:ring-4 focus:ring-orange-100 appearance-none cursor-pointer"
          >
            <option value="vendedor">🛍️ Vendedor</option>
            <option value="bodega">📦 Bodega</option>
            <option value="admin">🔑 Administrador</option>
          </select>
          <div
            class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <button
        type="submit"
        :disabled="userStore.loadingUser"
        class="mt-4 bg-gradient-to-r from-gelato-chocolate to-gray-800 text-white p-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        <span v-if="!userStore.loadingUser">{{
          initialData ? "Guardar Cambios" : "Confirmar Registro"
        }}</span>
        <span
          v-else
          class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
        ></span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
});

const userStore = useUserStore();
const router = useRouter();
const emit = defineEmits(["close"]);

const email = ref("");
const password = ref("");
const role = ref("vendedor");

onMounted(() => {
  if (props.initialData) {
    email.value = props.initialData.email;
    role.value = props.initialData.role;
  }
});

const handleSubmit = async () => {
  try {
    if (props.initialData) {
      // Logic for UPDATING role only
      const userRef = doc(db, "users", props.initialData.id);
      await updateDoc(userRef, { role: role.value });
      await userStore.getUsers();

      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        text: "El rol del empleado ha sido modificado.",
        confirmButtonColor: "#3E2723",
      });
      emit("close");
    } else {
      // Logic for NEW registration
      await userStore.registerUser(email.value, password.value, role.value);

      await Swal.fire({
        icon: "success",
        title: "¡Usuario Creado!",
        text: "Por seguridad, el sistema abrirá la sesión del nuevo usuario. Si desea seguir como administrador, deberá cerrar sesión y volver a entrar.",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#3E2723",
      });

      emit("close");
      router.push("/");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
      confirmButtonColor: "#EF5350",
    });
  }
};
</script>
