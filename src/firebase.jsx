// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuXB0KbKDVQrarJWboZEbyWPGCVftXqbw",
  authDomain: "lazzario-academy.firebaseapp.com",
  projectId: "lazzario-academy",
  storageBucket: "lazzario-academy.appspot.com",
  messagingSenderId: "790569450494",
  appId: "1:790569450494:web:920e1074e93932e8cf1eaf",
  measurementId: "G-0XC346WGJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)