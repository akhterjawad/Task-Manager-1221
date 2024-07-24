
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAo3NJyGOBPzvK88NGz98AytL1b35nuV5s",
    authDomain: "form-authentication-created.firebaseapp.com",
    projectId: "form-authentication-created",
    storageBucket: "form-authentication-created.appspot.com",
    messagingSenderId: "344239691300",
    appId: "1:344239691300:web:904f972bf7298382f36ab1",
    measurementId: "G-WKWDYE23ZX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);