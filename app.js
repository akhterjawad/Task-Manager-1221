// Import the functions you need from the SDKs you need
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
let google_btn = document.querySelector('.google_btn');
const forgotPassword = document.querySelector("#forgot-password");
// google authentication
const provider = new GoogleAuthProvider();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert('you are login')
            window.location = "home.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            email.value = '';
            password.value = '';
        });

});
forgotPassword.addEventListener("click", () => {
    const resetEmail = prompt("enter email");
    sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
            alert("email send");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});

google_btn.addEventListener('click', () => {
    console.log('google');

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location = 'home.html'
        }).catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});