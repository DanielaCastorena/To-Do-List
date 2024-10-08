// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqtJlxPoAwdMwvYwLGs5EI75L0rl0eu8s",
  authDomain: "todo-list-dc.firebaseapp.com",
  projectId: "todo-list-dc",
  storageBucket: "todo-list-dc.appspot.com",
  messagingSenderId: "738727175349",
  appId: "1:738727175349:web:2974cdcf5b70f2e38b4afc",
  measurementId: "G-B7TKEE9GTZ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export { auth, db, googleProvider };
