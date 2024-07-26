import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";





const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");



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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if (email.value==''&&password.value=='') {
                alert('fill the input')
            } else{
                alert(errorMessage)
            }
            email.value=''
            password.value=''
        });

})