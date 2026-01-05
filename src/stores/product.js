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
} from "firebase/firestore";
import { db, auth } from "../firebase";

export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    products: [],
    MIN_STOCK_THRESHOLD: 5,
  }),

  getters: {
    // Qué productos están bajos
    lowStockProducts: (state) => {
      return state.products.filter(p => p.stock <= state.MIN_STOCK_THRESHOLD && p.stock > 0);
    },
    // Qué productos están agotados?
    outOfStockProducts: (state) => {
      return state.products.filter(p => p.stock <= 0);
    },
    // Resumen para el dashboard
    stockMetrics: (state) => ({
      total: state.products.length,
      lowCount: state.products.filter(p => p.stock <= state.MIN_STOCK_THRESHOLD && p.stock > 0).length,
      outCount: state.products.filter(p => p.stock <= 0).length
    })
  },

  actions: {
    async getProducts() {
      this.loading = true
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

      // onSnapshot crea un puente vivo con la base de datos
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
        }
      );
    },

    async addProduct(name, price, stock) {
      try {
        const colRef = collection(db, "products");
        await addDoc(colRef, {
          name: name,
          price: Number(price),
          stock: Number(stock),
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });

        return true;
      } catch (error) {
        console.error("Error al guardar:", error);
        return false;
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

    async updateProductStock(id, newStock) {
      try {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
          stock: Number(newStock),
        });
      } catch (error) {
        console.error("Error en el store:", error);
        throw error;
      }
    },
  },
});
