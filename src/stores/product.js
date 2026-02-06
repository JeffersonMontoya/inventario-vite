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
    loading: false,
    products: [],
    categories: ["Helados", "Toppings", "Bebidas", "Materia Prima", "Insumos"],
    activeCategory: "Helados",
    logs: [],
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
      const totalCapital = state.products.reduce(
        (acc, p) => acc + p.stock * (p.price || 0),
        0,
      );
      const totalCost = state.products.reduce(
        (acc, p) => acc + p.stock * (p.costPrice || 0),
        0,
      );

      return {
        totalProducts: state.products.length,
        capitalValue: totalCapital, // Precio Venta Total
        costValue: totalCost, // Costo Total
        lowCount: state.products.filter(
          (p) => p.stock <= (p.minStock || 5) && p.stock > 0,
        ).length,
        outCount: state.products.filter((p) => p.stock <= 0).length,
      };
    },
  },

  actions: {
    setActiveCategory(category) {
      this.activeCategory = category;
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
      this.loading = true;
      try {
        const logsQuery = query(
          collectionGroup(db, "inventoryLogs"),
          orderBy("timestamp", "desc"),
        ); // Fetch from all subcollections
        const snapshot = await getDocs(logsQuery);

        // Map logs and potentially fetch user emails if not stored directly
        // For efficiency, we will store userId and try to map it, or rely on future improvements to store email in log.

        /* 
              Note: Firestore collectionGroup queries require an index. 
              If this fails, the console will provide a link to create it.
            */

        this.logs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // If we don't have userEmail stored, we might show userId.
            // Ideally, store email in logMovement.
            userEmail: data.userEmail || data.userId,
          };
        });
      } catch (error) {
        console.error("Error fetching logs:", error);
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
