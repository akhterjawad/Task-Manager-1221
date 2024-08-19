// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "../config.js";

// Select the form, email input, password input, and Google button from the DOM
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
// let google_btn = document.querySelector('.google_btn');

// Google authentication provider (assuming you'll add Google sign-in later)
// const provider = new GoogleAuthProvider();

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (email.value == '' && password.value == '') {
        alert('Please fill in the input fields');
    }
    createUserWithEmailAndPassword(auth, email.value, password.value)
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
                        window.location = '../index.html';
                    }
                });
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
            email.value = '';
            password.value = '';
        });
});



// google_btn.addEventListener('click', () => {
//     console.log('google');

//     signInWithPopup(auth, provider)
//         .then((result) => {
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             const user = result.user;
//             console.log(user);
//             window.location = 'index.html'
//         }).catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             const email = error.customData.email;
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             console.log(error);
//         });
// })