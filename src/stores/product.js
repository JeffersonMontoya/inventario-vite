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
  }),

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
