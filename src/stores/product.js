import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
} from "firebase/firestore";
import { db, auth } from "../firebase";

export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    products: [], 
  }),

  actions: {
    async addProduct(name, price, stock) {
      this.loading = true;
      try {
        const colRef = collection(db, "products");

        const newProduct = {
          name: name,
          price: Number(price),
          stock: Number(stock),
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        };

        await addDoc(colRef, newProduct);

        console.log("Producto guardado con éxito");
      } catch (error) {
        console.error("Error al guardar producto:", error);
      } finally {
        this.loading = false;
      }
    },

    async getProducts() {
      this.loading = true;
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
    
        this.products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        this.loading = false;
      }
    }
    
  },
});
