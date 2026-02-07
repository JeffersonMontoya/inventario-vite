import { ref } from "vue";
import { useProductStore } from "../stores/product";

export function useHome() {
  const productStore = useProductStore();
  const showForm = ref(false);
  const showAdminForm = ref(false);
  const selectedProduct = ref(null);

  const openForm = (product = null) => {
    selectedProduct.value = product;
    showForm.value = true;
  };

  const closeForm = () => {
    showForm.value = false;
    setTimeout(() => {
      selectedProduct.value = null;
    }, 300);
  };

  const toggleAdminForm = () => {
    showAdminForm.value = !showAdminForm.value;
  };

  const loadHomeData = async () => {
    await productStore.getProducts();
    productStore.setActiveCategory("Helados"); // Default tab
  };

  return {
    productStore,
    showForm,
    showAdminForm,
    selectedProduct,
    openForm,
    closeForm,
    toggleAdminForm,
    loadHomeData,
  };
}
