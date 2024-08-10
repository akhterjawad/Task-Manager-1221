
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCTWHgq71GJt_NfELuSJhPOXc4qATj2f_o",
  authDomain: "form-authentication-crea-8df59.firebaseapp.com",
  projectId: "form-authentication-crea-8df59",
  storageBucket: "form-authentication-crea-8df59.appspot.com",
  messagingSenderId: "503584947931",
  appId: "1:503584947931:web:83c104b087f63c692596fe",
  measurementId: "G-FDG5SSY8V7"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyBdaYBglLydJ3KVgyyg9IC4PLRsBuMfS8A",
//   authDomain: "task-manager-1221.firebaseapp.com",
//   projectId: "task-manager-1221",
//   storageBucket: "task-manager-1221.appspot.com",
//   messagingSenderId: "289531469369",
//   appId: "1:289531469369:web:69937b4cd3d16642b037e8",
//   measurementId: "G-PJ7HKT9LKC"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);