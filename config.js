
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBdaYBglLydJ3KVgyyg9IC4PLRsBuMfS8A",
  authDomain: "task-manager-1221.firebaseapp.com",
  projectId: "task-manager-1221",
  storageBucket: "task-manager-1221.appspot.com",
  messagingSenderId: "289531469369",
  appId: "1:289531469369:web:69937b4cd3d16642b037e8",
  measurementId: "G-PJ7HKT9LKC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);