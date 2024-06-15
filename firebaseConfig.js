// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Ar5o2AdqhkZ12t83Y-ZqcZZvL24EK-8",
  authDomain: "campusease-18880.firebaseapp.com",
  projectId: "campusease-18880",
  storageBucket: "campusease-18880.appspot.com",
  messagingSenderId: "624013282174",
  appId: "1:624013282174:web:c2738f3446db7eb5d8c12f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDatabase = getFirestore();
