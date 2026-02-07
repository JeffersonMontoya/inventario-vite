import { ref, computed } from "vue";
import { useProductStore } from "../stores/product";
import Swal from "sweetalert2";

export function useAdmin() {
  const productStore = useProductStore();
  const showForm = ref(false);
  const showAdminForm = ref(false);
  const selectedProduct = ref(null);
  const showingOnlyLosses = ref(false);

  const filteredLogs = computed(() => {
    if (showingOnlyLosses.value) {
      return productStore.logs.filter(
        (log) =>
          log.type === "pérdida" || (log.type === "venta" && log.quantity < 0),
      );
    }
    return productStore.logs;
  });

  const toggleLossFilter = () => {
    showingOnlyLosses.value = !showingOnlyLosses.value;
    if (showingOnlyLosses.value) {
      setTimeout(() => {
        const tableElement = document.querySelector("table");
        tableElement?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const openForm = (product = null) => {
    selectedProduct.value = product;
    showForm.value = true;
  };

  const closeForm = () => {
    showForm.value = false;
    selectedProduct.value = null;
  };

  const toggleAdminForm = () => {
    showAdminForm.value = !showAdminForm.value;
  };

  const deleteConfirm = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await productStore.deleteProducts(id);
      Swal.fire("Eliminado", "El producto ha sido borrado", "success");
    }
  };

  const loadAdminData = async () => {
    await productStore.getProducts();
    await productStore.getLogs();
    await productStore.getDailyStats();
  };

  const getEmoji = (cat) => {
    if (cat === "Helados") return "🍦";
    if (cat === "Bebidas") return "🥤";
    if (cat === "Toppings") return "🍫";
    return "📦";
  };

  const getLogTypeClass = (type) => {
    if (type === "venta") return "bg-green-100 text-green-700";
    if (type === "reabastecimiento") return "bg-blue-100 text-blue-700";
    if (type === "pérdida") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-600";
  };

  return {
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
  };
}
