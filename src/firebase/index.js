import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "chat-app-firebase-db.firebaseapp.com",
    projectId: "chat-app-firebase-db",
    storageBucket: "chat-app-firebase-db.appspot.com",
    messagingSenderId: "1064232280125",
    appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth() // login & register user...
export const db = getFirestore() // keep user information...
export const storage = getStorage() // store uploaded images...