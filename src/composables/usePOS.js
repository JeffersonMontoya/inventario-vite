import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import { useUserStore } from "../stores/user";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { useFormatters } from "./useFormatters";

export function usePOS() {
  const productStore = useProductStore();
  const userStore = useUserStore();
  const { formatCurrency } = useFormatters();

  const activeCategory = ref("Helados");
  const searchQuery = ref("");
  const sessionTotal = ref(0);
  const saleCategories = [
    "Favoritos",
    "Helados",
    "Bebidas",
    "Toppings",
    "Insumos",
  ];

  // Initialize favorites from localStorage
  const favorites = ref(
    JSON.parse(localStorage.getItem("gelato_favorites") || "[]"),
  );

  const toggleFavorite = (productId) => {
    const index = favorites.value.indexOf(productId);
    if (index === -1) favorites.value.push(productId);
    else favorites.value.splice(index, 1);
    localStorage.setItem("gelato_favorites", JSON.stringify(favorites.value));
  };

  onMounted(() => {
    // ... existing onMounted logic ...
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filterDate = today;
    if (userStore.lastShiftClosedAt) {
      const closedDate = new Date(userStore.lastShiftClosedAt.seconds * 1000);
      if (closedDate > today) filterDate = closedDate;
    }

    const q = query(
      collection(db, "sales"),
      where("userId", "==", userStore.userData?.uid),
      where("timestamp", ">", filterDate),
    );

    onSnapshot(q, (snap) => {
      let total = 0;
      snap.forEach((doc) => {
        total += doc.data().total || 0;
      });
      sessionTotal.value = total;
    });
  });

  const filteredProducts = computed(() => {
    let base = productStore.products;

    // Search Filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      base = base.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
      return base;
    }

    // Category Filter
    if (activeCategory.value === "Favoritos") {
      return base.filter((p) => favorites.value.includes(p.id));
    }

    return base.filter((p) => p.category === activeCategory.value);
  });

  const getProductEmoji = (cat) => {
    if (cat === "Helados") return "🍦";
    if (cat === "Bebidas") return "🥤";
    if (cat === "Toppings") return "🍫";
    return "📦";
  };

  const addToCart = (product, quantity) => {
    productStore.addToCart(product, quantity);
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          await userStore.updateLastShiftClosure();
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
    searchQuery,
    favorites,
    sessionTotal,
    saleCategories,
    filteredProducts,
    getProductEmoji,
    addToCart,
    toggleFavorite,
    showShiftReport,
    loadProducts,
  };
}
