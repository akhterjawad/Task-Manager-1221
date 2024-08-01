import {
    onAuthStateChanged,
    signOut
} 
from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth,db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

let form = document.querySelector('#form')
let title = document.querySelector('#title')
let description = document.querySelector('#value')

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        console.log('user login nahi ha');
        window.location = 'index.html'
    };
});


const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html'
    }).catch((error) => {
        console.log(error.message);
    });
});

form.addEventListener('submit',async event=>{
    event.preventDefault();

console.log(title.value);
console.log(description.value);

try {
    const docRef = await addDoc(collection(db, "post"), {
      title: title.value,
      description: description.value,
      uid: auth.currentUser.uid
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})