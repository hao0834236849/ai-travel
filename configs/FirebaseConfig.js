// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6un0qvmvWIIBGTWmpOxPc4sAv6nFXfmk",
  authDomain: "ai-travel-planner-b0512.firebaseapp.com",
  projectId: "ai-travel-planner-b0512",
  storageBucket: "ai-travel-planner-b0512.appspot.com",
  messagingSenderId: "846035411552",
  appId: "1:846035411552:web:fb1d2a7d7657f41698d905",
  measurementId: "G-SJYJNT1PBS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);