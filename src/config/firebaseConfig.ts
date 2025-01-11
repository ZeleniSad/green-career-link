import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNe9VUf4LMrPfPGclk_IDxdEypjKcWF0c",
  authDomain: "green-career-link.firebaseapp.com",
  projectId: "green-career-link",
  storageBucket: "green-career-link.firebasestorage.app",
  messagingSenderId: "225869071949",
  appId: "1:225869071949:web:00ba98c533f5ee6141be04",
  measurementId: "G-JYWTN3BJZT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
