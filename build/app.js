// Import the functions you need from the SDKs you need
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";

// Select the form, email input, password input, Google button, and forgot password link from the DOM,html
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
let google_btn = document.querySelector('.google_btn');
const forgotPassword = document.querySelector("#forgot-password");

// Google authentication provider
const provider = new GoogleAuthProvider();

// Handle form submission for email and password sign-in
form.addEventListener('submit', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value) // Sign in with email and password
        .then((userCredential) => {
            const user = userCredential.user; // Get the user object from the user credential
            console.log(user);
            alert('You are logged in');
            window.location = "home.html"; // Redirect to home.html
        })
        .catch((error) => {
            const errorMessage = error.message; // Get the error message
            console.log(errorMessage); 
            email.value = ''; 
            password.value = ''; 
        });
});

// Handle forgot password link click
forgotPassword.addEventListener("click", () => {
    const resetEmail = prompt("Enter your email"); 
    sendPasswordResetEmail(auth, resetEmail) // Send a password reset email
        .then(() => {
            alert("Email sent");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage); 
        });
});

// Handle Google sign-in button click
google_btn.addEventListener('click', () => {
    console.log('Google sign-in initiated'); 

    signInWithPopup(auth, provider) // Sign in with Google using a popup
        .then((result) => {
            const user = result.user; // Get the user object from the result
            console.log(user); 
            window.location = 'home.html'; // Redirect to home.html
        }).catch((error) => {
            const errorMessage = error.message; // Get the error message
            console.log(errorMessage);
        });
});
