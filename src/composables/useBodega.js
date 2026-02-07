import { ref, computed } from "vue";
import { useProductStore } from "../stores/product";
import Swal from "sweetalert2";

export function useBodega() {
  const productStore = useProductStore();
  const searchQuery = ref("");

  const filteredProducts = computed(() => {
    const term = searchQuery.value.toLowerCase();
    return productStore.products.filter(
      (p) =>
        (p.category === "Materia Prima" || p.category === "Insumos") &&
        p.name.toLowerCase().includes(term),
    );
  });

  const criticalItems = computed(() => {
    return productStore.products.filter((p) => p.stock <= (p.minStock || 5));
  });

  const updateStock = async (product, amount) => {
    try {
      await productStore.adjustStock(product, amount, "reabastecimiento");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        title: `+${amount} ${product.unit || "u"} a ${product.name}`,
      });
      Toast.fire();
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  };

  const openCustomStock = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: `Ajuste Manual: ${product.name}`,
      html: `
        <div class="text-left space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Cantidad</label>
            <input id="swal-input-qty" type="number" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none" placeholder="Ej. 10">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Motivo del ajuste</label>
            <select id="swal-input-reason" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none">
              <option value="reabastecimiento">Reabastecimiento (+)</option>
              <option value="pérdida">Pérdida / Daño (-)</option>
              <option value="ajuste">Manual (Corrección)</option>
            </select>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar Ajuste",
      confirmButtonColor: "#3B82F6",
      preConfirm: () => {
        const qty = document.getElementById("swal-input-qty").value;
        const reason = document.getElementById("swal-input-reason").value;
        if (!qty) {
          Swal.showValidationMessage("La cantidad es obligatoria");
        }
        return {
          qty: parseInt(qty),
          reason: reason,
        };
      },
    });

    if (formValues) {
      const finalAmount =
        formValues.reason === "pérdida"
          ? -Math.abs(formValues.qty)
          : formValues.qty;
      try {
        await productStore.adjustStock(product, finalAmount, formValues.reason);
        Swal.fire({
          icon: "success",
          title: "Ajuste Procesado",
          text: `Se registraron ${finalAmount} unidades como ${formValues.reason}`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (e) {
        Swal.fire("Error", e.message, "error");
      }
    }
  };

  const loadProducts = () => {
    productStore.getProducts();
  };

  return {
    searchQuery,
    filteredProducts,
    criticalItems,
    updateStock,
    openCustomStock,
    loadProducts,
  };
}
