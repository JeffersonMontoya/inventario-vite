// stores/user.js
import { defineStore } from "pinia";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc , setDoc } from "firebase/firestore";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: null,
    loadingUser: false,
    authReady: false,
    role: null,
  }),

  actions: {
    async registerUser(email, password, role) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await setDoc(doc(db, "users", user.uid), {
          email: email,
          uid: user.uid,
          role: role,
          createdAt: new Date(),
        });

        console.log(`Usuario ${email} registrado como ${role}`);
      } catch (error) {
        console.error("Error al registrar:", error);
        throw error;
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        // FALTA ESTO:
        await this.fetchUserRole(user.uid);
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      await signOut(auth);
      this.userData = null;
    },

    listenAuthState() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };

            await this.fetchUserRole(user.uid);
          } else {
            this.userData = null;
            this.role = null;
          }
          this.authReady = true;
          resolve();
        });
      });
    },

    // funcion para hacder el trabajo sucio de ir a internet y buscar en firestore y traer el dato
    async fetchUserRole(uid) {
      try {
        const docRef = doc(db, "users", uid); // Apuntamos al documento
        const docSnap = await getDoc(docRef); // Pedimos el documento

        if (docSnap.exists()) {
          // Si el documento está ahí, guardamos el rol en el estado
          this.role = docSnap.data().role;
        } else {
          // Si no existe, nos aseguramos de que sea null
          this.role = null;
        }
      } catch (error) {
        console.error("Error al pedir el rol:", error);
      }
    },
  },
});
