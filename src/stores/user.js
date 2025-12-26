// stores/user.js
import { defineStore } from "pinia";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: null,
    loadingUser: false,
    authReady: false, 
  }),

  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
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
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };
          } else {
            this.userData = null;
          }
          this.authReady = true;
          resolve(); // Resolver cuando Firebase responda
        });
      });
    },
  },
});
