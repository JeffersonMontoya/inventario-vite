<template>
  <section class="stats-grid">
    <div class="stat-card">
      <div class="icon-box blue">
        <span>📦</span>
      </div>
      <div class="stat-info">
        <span class="label">Total Productos</span>
        <span class="number">0</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="icon-box green">
        <span>💰</span>
      </div>
      <div class="stat-info">
        <span class="label">Valor Total</span>
        <span class="number">$0</span>
      </div>
    </div>

    <div class="stat-card warning-border">
      <div class="icon-box red">
        <span>⚠️</span>
      </div>
      <div class="stat-info">
        <span class="label">Stock Crítico</span>
        <span class="number text-red">0</span>
      </div>
      <div class="pulse-dot"></div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  animation: fadeIn 0.8s ease-out;
}

.stat-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.icon-box {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.icon-box.blue {
  background: rgba(37, 99, 235, 0.15);
  color: #60a5fa;
}

.icon-box.green {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.icon-box.red {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.label {
  color: #94a3b8;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 4px;
}

.number {
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
}

.text-red {
  color: #f87171;
}

.warning-border {
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.pulse-dot {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

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

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 20px;
  }
}
</style>
