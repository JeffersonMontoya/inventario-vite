<template>
  <div class="min-h-screen bg-[#FDF4FF] font-poppins text-[#4C1D95]">
    <AdminHeader
      :user-email="userStore.userData?.email || ''"
      @logout="handleLogout"
    />

    <main class="max-w-7xl mx-auto p-6">
      <!-- Dashboard Principal: 2x2 Layout -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
        <MetricsPanel
          :metrics="productStore.dailyStats"
          :accumulated="productStore.accumulatedStats"
          :seller-stats="productStore.sellerStats"
        />
        <RecentSalesTable />
        <StaffListTable @edit-staff="handleEditStaff" />
        <div
          class="bg-white p-6 rounded-[32px] shadow-sm border border-emerald-50 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[200px]"
        >
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors"
          ></div>
          <div class="relative z-10">
            <span
              class="text-4xl mb-3 block transform group-hover:scale-110 transition-transform"
              >🏆</span
            >
            <p
              class="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1"
            >
              Producto Estrella
            </p>
            <h4 class="text-xl font-black text-gray-800 font-playfair">
              {{ getTopProduct().name }}
            </h4>
            <div
              class="mt-3 px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold inline-block"
            >
              {{ getTopProduct().qty }} Unidades Vendidas
            </div>
          </div>
        </div>
      </section>

      <!-- Panel de Auditoría -->
      <section class="grid grid-cols-1 gap-8 mb-8">
        <LogsTable
          :logs="filteredLogs"
          :get-log-type-class="getLogTypeClass"
          @export="exportLogs"
        />
      </section>

      <!-- Panel de Acciones Rápidas -->
      <section class="flex flex-wrap gap-4 mb-8">
        <button
          @click="openForm(null)"
          class="bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-purple-200 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <span>＋</span> Nuevo Producto
        </button>
        <button
          @click="toggleAdminForm"
          class="bg-white text-purple-900 border border-purple-100 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <span>👥</span> Registrar Personal
        </button>
      </section>

      <!-- Inventario Rápido -->
      <InventoryGrid
        :products="productStore.filteredProducts"
        :categories="productStore.categories"
        :active-category="productStore.activeCategory"
        :get-emoji="getEmoji"
        @edit="openForm"
        @delete="deleteConfirm"
        @set-category="productStore.setActiveCategory"
      />

      <!-- Panel de Gestión -->
      <ActionCards
        :showing-only-losses="showingOnlyLosses"
        @toggle-admin-form="toggleAdminForm"
        @toggle-loss-filter="toggleLossFilter"
        @toggle-product-form="openForm(null)"
      />

      <!-- Modals -->
      <Transition name="fade">
        <div
          v-if="showForm"
          class="fixed inset-0 bg-purple-900/20 backdrop-blur-sm flex justify-center items-center z-[9999] p-6"
          @click.self="closeForm"
        >
          <div class="animate-[modalPop_0.3s_ease-out]">
            <ProductForm
              :product="selectedProduct"
              @close="closeForm"
              @saved="productStore.getProducts()"
            />
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="showAdminForm"
          class="fixed inset-0 bg-purple-900/20 backdrop-blur-sm flex justify-center items-center z-[9999] p-6"
          @click.self="toggleAdminForm"
        >
          <div
            class="bg-white w-full max-w-[450px] rounded-[32px] border border-gray-100 shadow-2xl animate-[modalPop_0.3s_ease-out] p-6"
          >
            <AdminUserForm
              :initial-data="editingStaff"
              @close="closeUserForm"
            />
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import { useAdmin } from "../composables/useAdmin";
import { useFormatters } from "../composables/useFormatters";

// Components
import AdminHeader from "../components/admin/AdminHeader.vue";
import MetricsPanel from "../components/admin/MetricsPanel.vue";
import RecentSalesTable from "../components/admin/RecentSalesTable.vue";
import StaffListTable from "../components/admin/StaffListTable.vue";
import LogsTable from "../components/admin/LogsTable.vue";
import InventoryGrid from "../components/admin/InventoryGrid.vue";
import ActionCards from "../components/admin/ActionCards.vue";
import ProductForm from "../components/products/ProductForm.vue";
import AdminUserForm from "../components/admin/AdminUserForm.vue";

const { userStore, handleLogout } = useAuth();
const {
  productStore,
  showForm,
  showAdminForm,
  selectedProduct,
  showingOnlyLosses,
  filteredLogs,
  toggleLossFilter,
  openForm,
  closeForm,
  toggleAdminForm,
  deleteConfirm,
  loadAdminData,
  getEmoji,
  getLogTypeClass,
} = useAdmin();

const { formatDate } = useFormatters();

import { ref } from "vue";
const editingStaff = ref(null);

const handleEditStaff = (staff) => {
  editingStaff.value = staff;
  showAdminForm.value = true;
};

const closeUserForm = () => {
  showAdminForm.value = false;
  editingStaff.value = null;
};

const getTopProduct = () => {
  // This is simple logic, ideally this comes from a proper report
  // but we can compute it from the logs we have
  const productCounts = {};
  productStore.logs.forEach((log) => {
    if (log.type === "venta") {
      const qty = Math.abs(log.quantity);
      productCounts[log.productName] =
        (productCounts[log.productName] || 0) + qty;
    }
  });

  const entries = Object.entries(productCounts);
  if (entries.length === 0) return { name: "Sin Ventas", qty: 0 };

  entries.sort((a, b) => b[1] - a[1]);
  return { name: entries[0][0], qty: entries[0][1] };
};

const exportLogs = () => {
  const headers = "Fecha,Usuario,Producto,Tipo,Cantidad\n";
  const rows = productStore.logs
    .map(
      (log) =>
        `${formatDate(log.timestamp)},${log.userEmail},${log.productName},${log.type},${log.quantity}`,
    )
    .join("\n");

  const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `movimientos_inventario_${new Date().toLocaleDateString()}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(() => {
  loadAdminData();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
