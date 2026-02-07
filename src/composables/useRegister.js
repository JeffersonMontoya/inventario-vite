import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export function useRegister() {
  const userStore = useUserStore();
  const router = useRouter();

  const email = ref("");
  const password = ref("");

  const handleRegister = async () => {
    if (!email.value || !password.value || password.value.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Email obligatorio y contraseña mínimo 6 caracteres.",
      });
      return;
    }

    try {
      await userStore.registerUser(email.value, password.value);
      Swal.fire({
        icon: "success",
        title: "¡Cuenta creada!",
        text: "Se ha registrado exitosamente.",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: error.message,
      });
    }
  };

  return {
    email,
    password,
    handleRegister,
    loading: userStore.loadingUser,
  };
}
