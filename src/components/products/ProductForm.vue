<script setup>
import { ref } from "vue";
import { useProductStore } from "../../stores/product";

const productStore = useProductStore();

const name = ref("");
const price = ref(0);
const stock = ref(0);
const isSuccess = ref(false);

const handleSubmit = async () => {
  try {
    await productStore.addProduct(name.value, price.value, stock.value);

    isSuccess.value = true;

    
    name.value = "";
    price.value = null;
    stock.value = null;

    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="form-wrapper">
    <h3>Agregar Producto</h3>

    <div class="form-container">
      <form
        @submit.prevent="handleSubmit"
        class="product-form"
        :class="{ 'is-blur': isSuccess }"
      >
        <div class="field">
          <label>Nombre</label>
          <input
            v-model="name"
            type="text"
            placeholder="Ej. Laptop Gaming"
            required
          />
        </div>

        <div class="form-row">
          <div class="field">
            <label>Precio</label>
            <input
              v-model="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>
          <div class="field">
            <label>Stock</label>
            <input v-model="stock" type="number" placeholder="0" required />
          </div>
        </div>

        <button
          type="submit"
          :disabled="productStore.loading || isSuccess"
          class="btn-submit"
        >
          <span v-if="!productStore.loading">Guardar Producto</span>
          <span v-else class="spinner"></span>
        </button>
      </form>

      <Transition name="fade-in">
        <div v-if="isSuccess" class="success-overlay">
          <div class="success-card">
            <div class="check-circle">✓</div>
            <h4>¡Producto Agregado!</h4>
            <p>El inventario se ha actualizado correctamente.</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 480px;
  text-align: left;
  position: relative;
}

h3 {
  color: #ffffff;
  margin-bottom: 28px;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  position: relative;
  padding-bottom: 10px;
  text-align: center;
}


h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #2563eb;
  border-radius: 2px;
}

.form-container {
  position: relative;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-form.is-blur {
  filter: blur(8px) grayscale(0.5);
  opacity: 0.3;
  pointer-events: none;
  transform: scale(0.98);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  margin-left: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

input {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  color: #f8fafc;
  padding: 14px 18px;
  border-radius: 14px;
  font-size: 15px;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.btn-submit {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-submit:hover:not(:disabled) {
  filter: brightness(1.2);
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.3),
    0 12px 24px rgba(37, 99, 235, 0.4);
  transform: translateY(-2px);
}

.btn-submit:disabled {
  background: #1e293b;
  border-color: transparent;
  color: #64748b;
  cursor: not-allowed;
}

.success-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.success-card {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 30px 20px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  max-width: 280px;
}

.check-circle {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 16px;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.4);
}

.success-card h4 {
  color: #10b981;
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 700;
}

.success-card p {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.4s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-active .success-card {
  animation: cardPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes cardPop {
  0% {
    transform: scale(0.5) translateY(20px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

/* Reset de inputs de número */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
