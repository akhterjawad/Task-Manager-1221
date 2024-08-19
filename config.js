
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCvoJDtXI39ayuQ5au-6DSQ0NHC7KxkGeA",
  authDomain: "task-manager-12221.firebaseapp.com",
  projectId: "task-manager-12221",
  storageBucket: "task-manager-12221.appspot.com",
  messagingSenderId: "641169527910",
  appId: "1:641169527910:web:7ada25480709d63d0389a7",
  measurementId: "G-EBVP3VK88X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);