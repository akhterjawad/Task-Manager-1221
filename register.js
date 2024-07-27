// Import the functions you need from the SDKs you need
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
let google_btn = document.querySelector('.google_btn')
// google authentication
const provider = new GoogleAuthProvider();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert('you are register')
            window.location = 'index.html'
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            if (email.value == '' && password.value == '') {
                alert('fill the input')
            } else {
                alert(errorMessage)
            }
            email.value = ''
            password.value = ''
            // alert('you are register' )
        });
    // email.value=''
    // password.value=''

})


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