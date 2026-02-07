import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export function useLogin() {
  const userStore = useUserStore();
  const router = useRouter();

  const email = ref("");
  const password = ref("");

  const handleLogin = async () => {
    if (!email.value || !password.value) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, completa todos los campos para continuar.",
        confirmButtonColor: "#FFB74D",
      });
      return;
    }

    try {
      await userStore.loginUser(email.value, password.value);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "¡Bienvenido de nuevo!",
      });

      router.push("/home");
    } catch (error) {
      console.error("Error de autenticación:", error.code);
      let errorMessage = "Credenciales incorrectas.";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Usuario o contraseña incorrectos.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Demasiados intentos fallidos. Intenta más tarde.";
      }

      Swal.fire({
        icon: "error",
        title: "Error de acceso",
        text: errorMessage,
        confirmButtonColor: "#EF5350",
      });
    }
  };

  return {
    email,
    password,
    handleLogin,
    loading: userStore.loadingUser,
  };
}
