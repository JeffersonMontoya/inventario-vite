import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    userData: null,
    role: null,
    loadingUser: false,
  }),

  actions: {
    async registerUser(email, password, role = "vendedor") {
      this.loadingUser = true;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: role,
          createdAt: new Date(),
        });

        this.userData = { email: user.email, uid: user.uid };
        this.role = role;
      } catch (error) {
        console.error("Error registration:", error);
        throw error;
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = userCredential.user;
        this.userData = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        await this.fetchUserRole(userCredential.user.uid);
      } catch (error) {
        console.error("Error login:", error);
        throw error;
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);
        this.user = null;
        this.userData = null;
        this.role = null;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchUserRole(uid) {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.role = docSnap.data().role;
        } else {
          this.role = "vendedor";
        }
      } catch (e) {
        console.error("Error fetching role:", e);
      }
    },

    listenAuthState() {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user;
            this.userData = { email: user.email, uid: user.uid };
            await this.fetchUserRole(user.uid);
            resolve(user);
          } else {
            this.user = null;
            this.userData = null;
            this.role = null;
            resolve(null);
          }
        });
      });
    },
  },
});
