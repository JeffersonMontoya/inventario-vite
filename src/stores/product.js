import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  runTransaction,
  where,
  getDocs,
  collectionGroup, // Added collectionGroup for deep queries
} from "firebase/firestore";
import { db, auth } from "../firebase";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
    categories: ["Helados", "Toppings", "Bebidas", "Materia Prima", "Insumos"],
    activeCategory: "Todos",
    logs: [],
    cart: [], // New Cart State
    dailyStats: { totalSales: "$0.00", netProfit: "$0.00", avgTicket: "$0.00" }, // Added dailyStats
  }),

  getters: {
    // Filtrado dinámico
    filteredProducts: (state) => {
      if (state.activeCategory === "Todos") return state.products;
      return state.products.filter((p) => p.category === state.activeCategory);
    },

    // Productos Críticos (Stock < MinStock)
    criticalStockProducts: (state) => {
      return state.products.filter(
        (p) => p.stock <= (p.minStock || 5) && p.stock > 0,
      );
    },

    outOfStockProducts: (state) => {
      return state.products.filter((p) => p.stock <= 0);
    },

    // Métricas Financieras y de Stock
    dashboardMetrics: (state) => {
      const lowCount = state.products.filter(
        (p) => p.stock <= (p.minStock || 5) && p.stock > 0,
      ).length;
      const outCount = state.products.filter((p) => p.stock <= 0).length;
      const capitalValue = state.products.reduce(
        (acc, p) => acc + (Number(p.price) || 0) * Number(p.stock),
        0,
      );
      const costValue = state.products.reduce(
        (acc, p) => acc + (Number(p.costPrice) || 0) * Number(p.stock),
        0,
      );

      return {
        lowCount,
        outCount,
        capitalValue,
        costValue,
      };
    },
    dailyMetrics: (state) =>
      state.dailyStats || {
        totalSales: "$0.00",
        netProfit: "$0.00",
        avgTicket: "$0.00",
      },
  },

  actions: {
    setActiveCategory(category) {
      this.activeCategory = category;
    },

    async getDailyStats() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const salesQuery = query(
        collection(db, "sales"),
        where("timestamp", ">=", today),
      );

      // Listening in real-time
      onSnapshot(salesQuery, (snap) => {
        let total = 0;
        let cost = 0;

        snap.forEach((doc) => {
          const data = doc.data();
          total += Number(data.total || 0);
          cost += Number(data.totalCost || 0);
        });

        const netProfit = total - cost;
        const avg = snap.size > 0 ? total / snap.size : 0;

        this.dailyStats = {
          totalSales: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total),
          netProfit: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(netProfit),
          avgTicket: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(avg),
        };
      });
    },

    async getProducts() {
      this.loading = true;
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

      onSnapshot(
        q,
        (snapshot) => {
          this.products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.loading = false;
        },
        (error) => {
          console.error("Error en tiempo real:", error);
          this.loading = false;
        },
      );
    },

    async getLogs() {
      const logsQuery = query(
        collectionGroup(db, "inventoryLogs"),
        orderBy("timestamp", "desc"),
      );

      onSnapshot(logsQuery, (snapshot) => {
        this.logs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userEmail: doc.data().userEmail || doc.data().userId,
        }));
      });
    },

    // --- CART ACTIONS ---
    addToCart(product) {
      const existing = this.cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(productId) {
      const index = this.cart.findIndex((item) => item.id === productId);
      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--;
        } else {
          this.cart.splice(index, 1);
        }
      }
    },

    clearCart() {
      this.cart = [];
    },

    // --- CHECKOUT PROCESS (TRANSACTION) ---
    async processSale(paymentMethod, userId) {
      if (this.cart.length === 0) throw new Error("Carrito vacío");

      this.loading = true;
      try {
        await runTransaction(db, async (transaction) => {
          // 1. Identify Consumables needed
          const consumables = ["Vaso", "Cuchara", "Servilleta", "Cono"];
          const consumableProducts = this.products.filter(
            (p) =>
              consumables.some((c) =>
                p.name.toLowerCase().includes(c.toLowerCase()),
              ) && p.category === "Insumos",
          );

          // 2. Prepare Reads (Refs)
          const productRefs = [];
          const cartMap = new Map(); // id -> quantity needed

          // Main products
          for (const item of this.cart) {
            const ref = doc(db, "products", item.id);
            productRefs.push({ ref, type: "product", id: item.id });
            cartMap.set(item.id, item.quantity);
          }

          // Consumables (only if Helados are in cart)
          const heladosCount = this.cart
            .filter((i) => i.category === "Helados")
            .reduce((acc, i) => acc + i.quantity, 0);

          if (heladosCount > 0) {
            for (const cons of consumableProducts) {
              const ref = doc(db, "products", cons.id);
              productRefs.push({ ref, type: "consumable", id: cons.id });
            }
          }

          // 3. Execute Reads
          const docs = await Promise.all(
            productRefs.map((p) => transaction.get(p.ref)),
          );

          // 4. Validate & Logic
          const updates = [];

          docs.forEach((docSnap, index) => {
            if (!docSnap.exists())
              throw new Error(
                "Producto no encontrado: " + productRefs[index].id,
              );

            const data = docSnap.data();
            const refInfo = productRefs[index];
            let newStock = data.stock;

            if (refInfo.type === "product") {
              const qty = cartMap.get(refInfo.id);
              if (data.stock < qty)
                throw new Error(`Stock insuficiente para ${data.name}`);
              newStock -= qty;
            } else if (refInfo.type === "consumable") {
              // Deduct 1 per helado sold
              if (data.stock < heladosCount)
                throw new Error(`Insumo insuficiente: ${data.name}`);
              newStock -= heladosCount;
            }

            updates.push({ ref: refInfo.ref, newStock });
          });

          // 5. Writes
          // Update Stocks and Create Logs
          for (const up of updates) {
            transaction.update(up.ref, { stock: up.newStock });

            // Log movement for each product update
            const logRef = doc(collection(up.ref, "inventoryLogs"));
            const productInfo = productRefs.find((p) => p.id === up.ref.id);
            const originalDoc =
              docs[productRefs.findIndex((p) => p.id === up.ref.id)];
            const productName = originalDoc.data().name;

            transaction.set(logRef, {
              productId: up.ref.id,
              productName: productName,
              quantity:
                productInfo.type === "product"
                  ? -cartMap.get(up.ref.id)
                  : -heladosCount,
              type: "venta",
              userId: userId,
              userEmail: auth.currentUser?.email || "anon",
              timestamp: serverTimestamp(),
            });
          }

          // Create Sale Record
          const total = this.cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          );
          const totalCost = this.cart.reduce(
            (sum, item) => sum + (item.costPrice || 0) * item.quantity,
            0,
          );

          const saleRef = doc(collection(db, "sales"));
          transaction.set(saleRef, {
            products: this.cart.map((i) => ({
              id: i.id,
              name: i.name,
              price: i.price,
              cost: i.costPrice || 0,
              quantity: i.quantity,
            })),
            subtotal: Number(total.toFixed(2)),
            taxes: 0, // Simplified tax logic
            total: Number(total.toFixed(2)),
            totalCost: Number(totalCost.toFixed(2)),
            paymentMethod: paymentMethod,
            userId: userId,
            timestamp: serverTimestamp(),
          });
        });

        this.clearCart();
        this.getProducts(); // Refresh local state
        return true;
      } catch (e) {
        console.error("Transacción fallida:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // Registro de Movimientos (Log)
    async logMovement(productId, productName, quantity, type, userId) {
      try {
        await addDoc(collection(db, "products", productId, "inventoryLogs"), {
          productId,
          productName,
          quantity, // cambio (+1, -1, etc)
          type, // 'venta', 'pérdida', 'reabastecimiento', 'ajuste'
          userId,
          userEmail: auth.currentUser?.email, // Added email for easier display
          timestamp: serverTimestamp(),
        });
      } catch (e) {
        console.error("Error logging movement:", e);
      }
    },

    async addProduct(productData) {
      try {
        const colRef = collection(db, "products");
        await addDoc(colRef, {
          name: productData.name,
          price: Number(productData.price),
          stock: Number(productData.stock),
          minStock: Number(productData.minStock || 5),
          category: productData.category,
          costPrice: Number(productData.costPrice || 0),
          unit: productData.unit || "Unidad",
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });
        return true;
      } catch (error) {
        console.error("Error al guardar:", error);
        throw error;
      }
    },

    async updateProduct(id, updatedData) {
      try {
        const docRef = doc(db, "products", id);
        // Log logic could be added here for big changes, but we'll stick to stock mainly
        await updateDoc(docRef, updatedData);
        return true;
      } catch (error) {
        console.error("Error al actualizar producto:", error);
        throw error;
      }
    },

    async deleteProducts(id) {
      try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      }
    },

    // Actualización de Stock con Log y Deducción de Insumos (Simple)
    async adjustStock(product, change, reason = "ajuste") {
      const newStock = Number(product.stock) + Number(change);
      if (newStock < 0) throw new Error("Stock insuficiente");

      try {
        const productRef = doc(db, "products", product.id);

        await updateDoc(productRef, {
          stock: newStock,
        });

        // Registrar Log
        await this.logMovement(
          product.id,
          product.name,
          change,
          reason,
          auth.currentUser?.uid || "system",
        );

        // Lógica de Insumos (Automática)
        // Si es una VENTA de un HELADO, descontar 1 servilleta/cuchara si existen como 'Insumos'
        if (
          reason === "venta" &&
          product.category === "Helados" &&
          change < 0
        ) {
          this.deductConsumables();
        }
      } catch (error) {
        console.error("Error adjusting stock:", error);
        throw error;
      }
    },

    // Función auxiliar para descontar insumos genéricos
    async deductConsumables() {
      // Buscar insumos comunes
      const consumables = this.products.filter((p) => p.category === "Insumos");

      // Por simplicidad, descontamos 1 de cada insumo que se llame 'Cono', 'Vaso', 'Cuchara' o 'Servilleta'
      const targetNames = ["Cono", "Vaso", "Cuchara", "Servilleta"];

      for (const item of consumables) {
        const isMatch = targetNames.some((name) =>
          item.name.toLowerCase().includes(name.toLowerCase()),
        );
        if (isMatch && item.stock > 0) {
          // Descontar sin loop infinito (reason 'consumo_automatico')
          await this.adjustStock(item, -1, "consumo_automatico");
        }
      }
    },
  },
});
