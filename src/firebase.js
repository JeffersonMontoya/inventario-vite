import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFZJnMCGartHvdbP-Y7lwX96oiM9WqOnY",
  authDomain: "inventario-c3e47.firebaseapp.com",
  projectId: "inventario-c3e47",
  storageBucket: "inventario-c3e47.firebasestorage.app",
  messagingSenderId: "197580445802",
  appId: "1:197580445802:web:6e02343a79c7f8b923d213",
};
initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };
