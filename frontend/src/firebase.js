// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shopit-v1-c66ae.firebaseapp.com",
  projectId: "shopit-v1-c66ae",
  storageBucket: "shopit-v1-c66ae.appspot.com",
  messagingSenderId: "841693456845",
  appId: "1:841693456845:web:6b75728f98b61ac0febc84",
  measurementId: "G-MMSH808DRS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);