// Import the functions you need from the SDKs you need
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "../config.js";

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
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                title: 'Success!',
                text: 'You are logged in successfully',
                icon: 'success',
                confirmButtonText: 'Login'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '../home.html';
                    }
                });
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        });
});

// Handle forgot password link click
forgotPassword.addEventListener("click", () => {
    const resetEmail = prompt("Enter your email");
    sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
            alert("Email sent");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage)
        });
});

// Handle Google sign-in button click
google_btn.addEventListener('click', () => {
    console.log('Google sign-in initiated');

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            Swal.fire({
                title: 'Success!',
                text: 'You are logged in successfully',
                icon: 'success',
                confirmButtonText: 'Login'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '../home.html';
                    }
                });
            console.log(user);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        });
});
