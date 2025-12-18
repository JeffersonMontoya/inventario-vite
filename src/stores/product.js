import { defineStore } from "pinia";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
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
  },
});
