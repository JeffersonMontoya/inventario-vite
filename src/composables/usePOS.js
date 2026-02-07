import { ref, computed } from "vue";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { useFormatters } from "./useFormatters";

export function usePOS() {
  const productStore = useProductStore();
  const userStore = useUserStore();
  const { formatCurrency } = useFormatters();

  const activeCategory = ref("Helados");
  const saleCategories = ["Helados", "Bebidas", "Toppings", "Insumos"];

  const filteredProducts = computed(() => {
    return productStore.products.filter(
      (p) => p.category === activeCategory.value,
    );
  });

  const getProductEmoji = (cat) => {
    if (cat === "Helados") return "🍦";
    if (cat === "Bebidas") return "🥤";
    if (cat === "Toppings") return "🍫";
    return "📦";
  };

  const addToCart = (product) => {
    productStore.addToCart(product);
  };

  const showShiftReport = async (onLogout) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const salesQuery = query(
        collection(db, "sales"),
        where("userId", "==", userStore.userData.uid),
        where("timestamp", ">=", today),
      );

      const snap = await getDocs(salesQuery);
      let cash = 0;
      let card = 0;
      let productsMap = {};

      snap.forEach((doc) => {
        const data = doc.data();
        if (data.paymentMethod === "Efectivo") cash += data.total;
        else card += data.total;

        data.products.forEach((p) => {
          productsMap[p.name] = (productsMap[p.name] || 0) + p.quantity;
        });
      });

      const topProducts = Object.entries(productsMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, qty]) => `${name} (${qty}u)`)
        .join("<br>");

      Swal.fire({
        title: "📜 Cierre de Turno",
        html: `
                <div class="text-left space-y-4">
                    <div class="p-3 bg-emerald-50 rounded-xl">
                        <p class="text-xs font-bold text-emerald-600 uppercase">Efectivo en Caja</p>
                        <p class="text-xl font-black text-emerald-900">${formatCurrency(cash)}</p>
                    </div>
                    <div class="p-3 bg-blue-50 rounded-xl">
                        <p class="text-xs font-bold text-blue-600 uppercase">Ventas con Tarjeta</p>
                        <p class="text-xl font-black text-blue-900">${formatCurrency(card)}</p>
                    </div>
                    <div class="mt-4">
                        <p class="text-xs font-bold text-gray-400 uppercase mb-2">Top 3 Productos</p>
                        <p class="text-sm font-bold text-gray-700">${topProducts || "Sin ventas hoy"}</p>
                    </div>
                </div>
            `,
        confirmButtonText: "Cerrar Turno y Salir",
        showCancelButton: true,
        cancelButtonText: "Continuar Vendiendo",
        confirmButtonColor: "#059669",
        background: "#ffffff",
      }).then((result) => {
        if (result.isConfirmed) {
          onLogout();
        }
      });
    } catch (e) {
      Swal.fire("Error", "No se pudo generar el reporte", "error");
    }
  };

  const loadProducts = () => {
    productStore.getProducts();
  };

  return {
    activeCategory,
    saleCategories,
    filteredProducts,
    getProductEmoji,
    addToCart,
    showShiftReport,
    loadProducts,
  };
}
