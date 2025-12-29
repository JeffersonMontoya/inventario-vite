<script setup>
 defineProps({
  product: {
    type: Object,
    required: true
  }
});

// Función opcional para formatear moneda
const formatPrice = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
</script>

<template>
  <div class="product-card">
    <div class="card-header">
      <div class="product-icon">📦</div>
      <span :class="['stock-badge', { 'low-stock': product.stock < 5 }]">
        {{ product.stock }} unidades
      </span>
    </div>

    <div class="card-body">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </div>

    <div class="card-footer">
      <button class="btn-edit" title="Editar">✏️</button>
      <button class="btn-delete" title="Eliminar">🗑️</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-card:hover {
  transform: translateY(-5px);
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(37, 99, 235, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-icon {
  font-size: 24px;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px;
  border-radius: 12px;
}

.stock-badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  font-weight: 600;
}

.stock-badge.low-stock {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.product-name {
  color: #f9fafb;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.product-price {
  color: #60a5fa;
  font-size: 22px;
  font-weight: 700;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 15px;
}

.btn-edit, .btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  border-radius: 8px;
  transition: background 0.2s;
}

.btn-edit:hover { background: rgba(255, 255, 255, 0.1); }
.btn-delete:hover { background: rgba(239, 68, 68, 0.1); }
</style>