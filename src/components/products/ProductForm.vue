<template>
  <div class="max-w-[480px] text-left relative">
    <button 
      type="button"
      @click="$emit('close')" 
      class="absolute -top-2 -right-2 text-slate-400 hover:text-white hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition-all z-20"
    >
      <span class="text-2xl">&times;</span>
    </button>

    <h3 class="text-white mb-7 text-[1.8rem] font-bold tracking-tight relative pb-2.5 text-center ...">
      Agregar Producto
    </h3>

    <div class="relative">
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-5 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="{ 'blur-md grayscale-[0.5] opacity-30 pointer-events-none scale-[0.98]': isSuccess }"
      >
        <div class="flex flex-col gap-2">
          <label class="text-[0.75rem] font-bold text-slate-500 ml-1 uppercase tracking-wider">Nombre</label>
          <input
            v-model="name"
            type="text"
            placeholder="Ej. Laptop Gaming"
            required
            class="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 text-slate-50 p-[14px_18px] rounded-[14px] text-[15px] w-full outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-900/90 focus:ring-4 focus:ring-blue-500/15 focus:-translate-y-px"
          />
        </div>

        <div class="grid grid-cols-2 gap-[15px]">
          <div class="flex flex-col gap-2">
            <label class="text-[0.75rem] font-bold text-slate-500 ml-1 uppercase tracking-wider">Precio</label>
            <input
              v-model="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              class="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 text-slate-50 p-[14px_18px] rounded-[14px] text-[15px] w-full outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-900/90 focus:ring-4 focus:ring-blue-500/15 focus:-translate-y-px [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[0.75rem] font-bold text-slate-500 ml-1 uppercase tracking-wider">Stock</label>
            <input 
              v-model="stock" 
              type="number" 
              placeholder="0" 
              required 
              class="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 text-slate-50 p-[14px_18px] rounded-[14px] text-[15px] w-full outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-900/90 focus:ring-4 focus:ring-blue-500/15 focus:-translate-y-px [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="productStore.loading || isSuccess"
          class="bg-gradient-to-br from-blue-600 to-blue-700 text-white border border-white/10 p-4 rounded-[14px] font-bold text-base mt-2.5 transition-all duration-300 flex justify-center items-center hover:not-disabled:brightness-110 hover:not-disabled:shadow-[0_0_20px_rgba(37,99,235,0.3),0_12px_24px_rgba(37,99,235,0.4)] hover:not-disabled:-translate-y-0.5 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
        >
          <span v-if="!productStore.loading">Guardar Producto</span>
          <span v-else class="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
        </button>
      </form>

      <Transition name="fade-in">
        <div v-if="isSuccess" class="absolute inset-0 flex items-center justify-center z-10">
          <div class="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/40 p-[30px_20px] rounded-[24px] text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[280px] success-card-anim">
            <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-[0_10px_20px_rgba(16,185,129,0.4)]">
              ✓
            </div>
            <h4 class="text-emerald-500 text-xl font-bold mb-2">¡Producto Agregado!</h4>
            <p class="text-slate-400 text-sm leading-relaxed">El inventario se ha actualizado correctamente.</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "../../stores/product";

const productStore = useProductStore();

const name = ref("");
const price = ref(null);
const stock = ref(null);
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

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.4s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-active .success-card-anim {
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>