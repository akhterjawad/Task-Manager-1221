import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { auth, db } from "./config.js";

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


form.addEventListener('submit', async event => {
    event.preventDefault()
    try {
Div.innerHTML=``;
        const docRef = await addDoc(collection(db, "users"), {
            firstName: title.value,
            lastName: description.value,
            Uid: auth.currentUser.uid
        })
        console.log("Document written with ID: ", docRef.id);
GetDataFromFirestore()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})
let array = [];
async function GetDataFromFirestore() {
    array=[];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        array.push(doc.data());
    });
    Div.innerHTML = '';  // Clear previous entries in the main div
    array.map((item) => {
        // Add new entries to the main div
        Div.innerHTML += `<div class="card d-flex justify-content-center">
            <div class="card-body ">
                <p><span class='h4'>Description:</span> ${item.firstName}</p>
                <p><span class='h4'>Title:</span> ${item.lastName}</p>
                <button type="button" class="btn button btn-danger delete-btn" >delete</button>
                <button type="button" class="btn button btn-success edit-btn">edit</button>
                </div>
            </div>
        <br/>`
    })
    console.log(array);
};
GetDataFromFirestore()



// // here is empty array for push todos
// let array = [];

// // Fetch data from Firestore
// async function GetDataFromFirestore() {
//     // array.length=0;
//     const querySnapshot = await getDocs(collection(db, "post"));  // Get all documents from the "post" collection

//     querySnapshot.forEach((doc) => {
//         array.push({
//             ...doc.data(),
//             id: doc.id
//         });  // Add document data to array
//     });
//     console.log(array);
//     renderScreen()
// }

// // Fetch data when the script runs
// GetDataFromFirestore();

// function renderScreen() {
//     Div.innerHTML = '';  // Clear previous entries in the main div
//     array.map((item) => {
//         // Add new entries to the main div
//         Div.innerHTML += `<div class="card d-flex justify-content-center">
//             <div class="card-body ">
//                 <p><span class='h4'>Description:</span> ${item.description}</p>
//                 <p><span class='h4'>Title:</span> ${item.title}</p>
//                 <button type="button" class="btn button btn-danger delete-btn" >delete</button>
//                 <button type="button" class="btn button btn-success edit-btn">edit</button>
//                 </div>
//             </div>
//         <br/>`
//     });

//     // delete button
//     let deleteButtons = document.querySelectorAll('.delete-btn');
//     deleteButtons.forEach((btn, index) => {
//         btn.addEventListener('click', async () => {
//             console.log('delete', index);
//             await deleteDoc(doc(db, "post", array[index].id));
//             array.splice(index, 1)
//             renderScreen()
//         })
//     });
// }



// // Handle form submission
// form.addEventListener('submit', async event => {
//     event.preventDefault();  // Prevent the default form submission behavior
//     // Div.innerHTML = '';  // Clear previous entries in the main div

//     if (description.value && title.value === '') {
//         alert('Enter todo first')
//     } else {
//         try {
//             // Add new document to Firestore
//             const docRef = await addDoc(collection(db, "post"), {
//                 title: title.value,
//                 description: description.value,
//                 createdAt: new Date().toISOString(),
//                 uid: auth.currentUser.uid  // Include the user ID of the current user
//             });
//             console.log("Document written with ID: ", docRef.id);
//             array.push({
//                 title: title.value,
//                 description: description.value,
//                 createdAt: new Date().toISOString(),
//                 uid: auth.currentUser.uid  // Include the user ID of the current user
//             });
//             console.log(array);
//             renderScreen()

//             // GetDataFromFirestore();  // Fetch data after adding new document
//         } catch (e) {
//             console.error("Error adding document: ", e);  // Log any errors during document addition
//         }
//     }
// });

