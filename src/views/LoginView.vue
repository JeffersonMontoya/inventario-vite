<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Bienvenido</h1>
        <p>Inicia sesión para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            v-model="email"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            v-model="password"
            required
          />
        </div>

        <button
          type="submit"
          class="btn-primary"
          :disabled="userStore.loadingUser"
        >
          <span v-if="!userStore.loadingUser">Ingresar</span>
          <span v-else>Ingresando...</span>
        </button>
      </form>

      <div class="login-footer">
        <p>¿No tienes cuenta?</p>
        <router-link to="/register" class="link-register">
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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #1e293b 0%, #020617 70%);
  padding: 20px;
}

.login-card {
  background: #020617;
  border-radius: 22px;
  width: 100%;
  max-width: 420px;
  padding: 42px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  animation: slideUp 0.5s ease-out;
}

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

.login-header {
  text-align: center;
  margin-bottom: 34px;
}

.login-header h1 {
  font-size: 30px;
  color: #f9fafb;
  font-weight: 700;
  margin-bottom: 6px;
}

.login-header p {
  color: #9ca3af;
  font-size: 15px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 13px;
  font-weight: 600;
  color: #cbd5f5;
}

.input-group input {
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #1e293b;
  background: #020617;
  color: #f9fafb;
  font-size: 15px;
  transition: all 0.25s ease;
  outline: none;
}

.input-group input::placeholder {
  color: #64748b;
}

.input-group input:hover {
  border-color: #334155;
}

.input-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}

.btn-primary {
  margin-top: 14px;
  padding: 15px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 12px 25px rgba(37, 99, 235, 0.45);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 18px 35px rgba(37, 99, 235, 0.6);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 32px;
  text-align: center;
}

.login-footer p {
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 6px;
}

.link-register {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.25s ease;
}

.link-register:hover {
  color: #60a5fa;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 34px 26px;
  }

  .login-header h1 {
    font-size: 26px;
  }
}
</style>
