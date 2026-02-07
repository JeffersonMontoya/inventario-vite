<template>
  <div
    class="bg-white p-6 rounded-[32px] shadow-sm border border-purple-50 flex flex-col relative overflow-hidden group"
  >
    <div
      class="absolute -top-10 -left-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50"
    ></div>

    <div class="relative z-10 flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-bold text-gray-800 flex items-center gap-2">
          💰 Balance de Caja
        </h3>
        <span
          class="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-black uppercase"
          >En Vivo</span
        >
      </div>

      <!-- Main Stats Split -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          class="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center"
        >
          <p
            class="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1"
          >
            Hoy
          </p>
          <p class="text-xl font-black text-purple-900 font-mono">
            {{ metrics.totalSales || "$0.00" }}
          </p>
        </div>
        <div
          class="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center"
        >
          <p
            class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1"
          >
            Total
          </p>
          <p class="text-xl font-black text-gray-800 font-mono">
            {{ accumulated?.totalSales || "$0.00" }}
          </p>
        </div>
      </div>

      <!-- Sellers Today -->
      <div class="flex-1 flex flex-col min-h-0">
        <p
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1"
        >
          Ventas por Vendedor (Hoy)
        </p>
        <div class="overflow-y-auto custom-scrollbar pr-2 flex-1 max-h-[140px]">
          <div
            v-if="sellerStats.length === 0"
            class="text-center py-4 opacity-30 text-xs text-purple-900"
          >
            Sin ventas hoy
          </div>
          <div
            v-for="seller in sellerStats"
            :key="seller.uid"
            class="flex items-center justify-between p-3 mb-2 bg-white border border-gray-50 rounded-xl hover:shadow-sm transition-all group/item"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px]"
              >
                🛍️
              </div>
              <span
                class="text-xs font-bold text-gray-700 truncate max-w-[100px]"
                >{{ getSellerName(seller.uid) }}</span
              >
            </div>
            <span class="text-xs font-black text-emerald-600 font-mono">{{
              formatCurrency(seller.total)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/user";
import { useFormatters } from "../../composables/useFormatters";

const userStore = useUserStore();
const { formatCurrency } = useFormatters();

const props = defineProps({
  metrics: {
    type: Object,
    required: true,
  },
  accumulated: {
    type: Object,
    default: () => ({ totalSales: "$0.00" }),
  },
  sellerStats: {
    type: Array,
    default: () => [],
  },
});

const getSellerName = (uid) => {
  const user = userStore.users.find((u) => u.uid === uid);
  return user ? user.email.split("@")[0] : "Vendedor";
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f3e8ff;
  border-radius: 4px;
}
</style>
