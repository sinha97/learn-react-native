// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5_96y30d7rOBlcmDePHyVDYbaAfjyX3I",
  authDomain: "expense-tracker-app-3e540.firebaseapp.com",
  projectId: "expense-tracker-app-3e540",
  storageBucket: "expense-tracker-app-3e540.firebasestorage.app",
  messagingSenderId: "960328888794",
  appId: "1:960328888794:web:fe35b1cdb6e3e9b26f10e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const db = getFirestore(app);
