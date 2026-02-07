<template>
  <div
    class="bg-white p-6 rounded-[32px] shadow-sm border border-blue-50 flex flex-col h-full"
  >
    <div class="flex items-center justify-between mb-4 shrink-0">
      <h3
        class="text-lg font-bold font-playfair text-gray-800 flex items-center gap-2"
      >
        💸 Ventas Recientes
      </h3>
      <div v-if="totalPages > 1" class="flex gap-1">
        <button
          @click="page--"
          :disabled="page === 1"
          class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all text-xs"
        >
          ←
        </button>
        <button
          @click="page++"
          :disabled="page === totalPages"
          class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all text-xs"
        >
          →
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-hidden">
      <div v-if="sales.length === 0" class="py-10 text-center opacity-30">
        <p class="text-sm italic text-blue-900">
          No hay ventas registradas hoy.
        </p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="sale in paginatedSales"
          :key="sale.id"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-blue-100 group"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs"
            >
              {{ sale.products?.length || 0 }}
            </div>
            <div class="min-w-0">
              <p class="font-bold text-gray-800 text-xs truncate max-w-[150px]">
                {{ sale.products?.map((p) => p.name).join(", ") }}
              </p>
              <p class="text-[9px] text-gray-400 font-mono">
                {{ formatTime(sale.timestamp) }} • {{ sale.paymentMethod }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-black text-emerald-700 text-sm">
              {{ formatCurrency(sale.total) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="sales.length > 0"
      class="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center"
    >
      <span
        class="text-[10px] font-bold text-blue-300 uppercase tracking-widest"
        >Página {{ page }}/{{ totalPages }}</span
      >
      <span
        class="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase"
        >Hoy: {{ sales.length }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useFormatters } from "../../composables/useFormatters";

const sales = ref([]);
const page = ref(1);
const itemsPerPage = 4;
const { formatCurrency } = useFormatters();

const formatTime = (ts) => {
  if (!ts) return "";
  const date = ts.toDate();
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const totalPages = computed(() => Math.ceil(sales.value.length / itemsPerPage));

const paginatedSales = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return sales.value.slice(start, start + itemsPerPage);
});

onMounted(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const salesQuery = query(
    collection(db, "sales"),
    where("timestamp", ">=", today),
    orderBy("timestamp", "desc"),
  );

  onSnapshot(salesQuery, (snap) => {
    sales.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
});
</script>
