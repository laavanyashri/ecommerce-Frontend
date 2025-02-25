// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC-2L9LV5Cf8kdQ2GyJVL89RMJ678pj-iw",
  authDomain: "emc-e-commerce.firebaseapp.com",
  projectId: "emc-e-commerce",
  storageBucket: "emc-e-commerce.firebasestorage.app",
  messagingSenderId: "1093851673988",
  appId: "1:1093851673988:web:0d56a616913c6c750759d1",
  measurementId: "G-VPBE0QTB8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)


export default auth