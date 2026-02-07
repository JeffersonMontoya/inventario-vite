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
    users: [],
    role: null,
    lastShiftClosedAt: null,
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
          uid: user.uid,
          email: user.email,
          role: role,
          createdAt: new Date(),
        });

        // Refetch users after registration
        await this.getUsers();
      } catch (error) {
        console.error("Error registration:", error);
        throw error;
      } finally {
        this.loadingUser = false;
      }
    },

    async getUsers() {
      try {
        const { getDocs, collection, query, orderBy } =
          await import("firebase/firestore");
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        this.users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.error("Error fetching users:", e);
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
          const data = docSnap.data();
          this.role = data.role;
          this.lastShiftClosedAt = data.lastShiftClosedAt || null;
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

    async updateLastShiftClosure() {
      if (!this.userData?.uid) return;
      try {
        const { updateDoc, doc, serverTimestamp } =
          await import("firebase/firestore");
        const now = new Date();
        const docRef = doc(db, "users", this.userData.uid);
        await updateDoc(docRef, {
          lastShiftClosedAt: serverTimestamp(),
        });
        this.lastShiftClosedAt = { seconds: Math.floor(now.getTime() / 1000) };
      } catch (e) {
        console.error("Error updating closure:", e);
      }
    },
  },
});
