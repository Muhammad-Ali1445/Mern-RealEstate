// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realestate-cde60.firebaseapp.com",
  projectId: "mern-realestate-cde60",
  storageBucket: "mern-realestate-cde60.appspot.com",
  messagingSenderId: "887896942890",
  appId: "1:887896942890:web:fb46dd6b3d7a18d6321653",
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
