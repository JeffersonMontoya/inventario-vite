<template>
  <div class="home-container">
    <nav class="navbar">
      <div class="nav-content">
        <div class="nav-brand">
          <h2>Mi App</h2>
        </div>
        <div class="nav-actions">
          <div class="user-info">
            <div class="user-avatar">
              {{ userInitial }}
            </div>
            <span class="user-email">{{ userStore.userData?.email }}</span>
          </div>
          <button @click="handleLogout" class="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <div class="welcome-section">
        <h1 class="welcome-title">¡Bienvenido de vuelta! 👋</h1>
        <p class="welcome-subtitle">Has iniciado sesión exitosamente</p>
      </div>

      <div class="cards-grid">
        <div class="card">
          <div class="card-icon">📊</div>
          <h3>Dashboard</h3>
          <p>Visualiza tus estadísticas y métricas</p>
        </div>

        <div class="card">
          <div class="card-icon">⚙️</div>
          <h3>Configuración</h3>
          <p>Personaliza tu experiencia</p>
        </div>

        <div class="card">
          <div class="card-icon">👥</div>
          <h3>Comunidad</h3>
          <p>Conecta con otros usuarios</p>
        </div>

        <div class="card">
          <div class="card-icon">📚</div>
          <h3>Recursos</h3>
          <p>Aprende más sobre la plataforma</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const userInitial = computed(() => {
  return userStore.userData?.email?.charAt(0).toUpperCase() || "U";
});

const handleLogout = async () => {
  try {
    await userStore.logoutUser();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1e293b 0%, #020617 70%);
}

.navbar {
  background: #020617;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.7);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h2 {
  color: #f9fafb;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.user-email {
  color: #cbd5f5;
  font-size: 14px;
  font-weight: 500;
}

.btn-logout {
  padding: 10px 20px;
  background: transparent;
  color: #60a5fa;
  border: 1px solid #2563eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-logout:hover {
  background: #2563eb;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.4);
}

.btn-logout:active {
  transform: translateY(0);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 48px;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-title {
  font-size: 40px;
  color: #f9fafb;
  font-weight: 700;
  margin-bottom: 10px;
}

.welcome-subtitle {
  font-size: 17px;
  color: #9ca3af;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  animation: slideUp 0.6s ease-out 0.2s both;
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

.card {
  background: #020617;
  border-radius: 18px;
  padding: 34px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(37, 99, 235, 0.35),
    inset 0 0 0 1px rgba(37, 99, 235, 0.4);
}

.card-icon {
  font-size: 46px;
  margin-bottom: 16px;
}

.card h3 {
  font-size: 20px;
  color: #f9fafb;
  margin-bottom: 8px;
  font-weight: 600;
}

.card p {
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .nav-actions {
    width: 100%;
    justify-content: space-between;
  }

  .user-email {
    display: none;
  }

  .welcome-title {
    font-size: 30px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 36px 16px;
  }
}
</style>
