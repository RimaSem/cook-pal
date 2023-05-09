import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TO-DO: replace the following with environment variables
export const firebaseConfig = {
  apiKey: "AIzaSyBVLWrkCJsQ9W8zBLkvaB5zNZJBElHSfuQ",
  authDomain: "cook-pal-5538b.firebaseapp.com",
  projectId: "cook-pal-5538b",
  storageBucket: "cook-pal-5538b.appspot.com",
  messagingSenderId: "787882832310",
  appId: "1:787882832310:web:48ff5f95c3955faf959117",
  measurementId: "G-SGBGC6J5Z8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
