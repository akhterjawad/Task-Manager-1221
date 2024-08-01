import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Select the logout button, form, title input, description input, and main div from the DOM,HTML
const logout = document.querySelector("#logout");
let form = document.querySelector('#form');
let title = document.querySelector('#title');
let description = document.querySelector('#value');
let Div = document.querySelector('#MainDiv');

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;  // User is signed in, get user ID
        console.log(uid);
    } else {
        console.log('user login nahi ha');  // User is not signed in
        window.location = 'index.html';  // Redirect to index.html
    }
});

// Handle logout button click
logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log('logout successfully');  // Successfully logged out
        window.location = 'index.html';  // Redirect to index.html
    }).catch((error) => {
        console.log(error.message);  // Log any errors during sign-out
    });
});

// Fetch data from Firestore
async function GetDataFromFirestore() {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "post"));  // Get all documents from the "post" collection
    querySnapshot.forEach((doc) => {
        array.push(doc.data());  // Add document data to array
    });
    console.log(array);
    Div.innerHTML = '';  // Clear previous entries in the main div
    array.map((item) => {
        // Add new entries to the main div
        Div.innerHTML += `<div class="card d-flex justify-content-center">
            <div class="card-body">
                <p><span class='h3'>Description</span>: ${item.description}</p>
                <p><span class='h3'>Title</span>: ${item.title}</p>
            </div>
        </div><br/>`
    });
}

// Fetch data when the script runs
GetDataFromFirestore();

// Handle form submission
form.addEventListener('submit', async event => {
    event.preventDefault();  // Prevent the default form submission behavior
    Div.innerHTML = '';  // Clear previous entries in the main div
    try {
        // Add new document to Firestore
        const docRef = await addDoc(collection(db, "post"), {
            title: title.value,
            description: description.value,
            uid: auth.currentUser.uid  // Include the user ID of the current user
        });
        console.log("Document written with ID: ", docRef.id);
        GetDataFromFirestore();  // Fetch data after adding new document
    } catch (e) {
        console.error("Error adding document: ", e);  // Log any errors during document addition
    }
});
