// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDLHspt2PwnUdS6-NZDbf20aUzDxssGVc",
  authDomain: "pokemonproject-7b89e.firebaseapp.com",
  projectId: "pokemonproject-7b89e",
  storageBucket: "pokemonproject-7b89e.appspot.com",
  messagingSenderId: "897609615447",
  appId: "1:897609615447:web:6013e9db762794be0e3b12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;