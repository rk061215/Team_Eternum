import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBr9y_1htMvlq1wz9PNXLZgp4k8Mn64BWs",
  authDomain: "ecotrack-e63ff.firebaseapp.com",
  projectId: "ecotrack-e63ff",
  storageBucket: "ecotrack-e63ff.appspot.com", // ✅ IMPORTANT FIX
  messagingSenderId: "5632458416",
  appId: "1:5632458416:web:92b01ed4ddb3dd457d8575",
  measurementId: "G-Y0B0ZJ30K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
