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
    Timestamp,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { auth, db } from "./config.js";

// Select the logout button, form, title input, description input, and main div from the DOM,HTML
const logout = document.querySelector("#logout");
let form = document.querySelector('#form');
let title = document.querySelector('#title');
let description = document.querySelector('#value');
let Div = document.querySelector('#MainDiv');
const select = document.querySelector("#select");
const citiesBtn = document.querySelectorAll(".cities-btn");
const reset = document.querySelector(".reset");


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



//global array
let array = [];

// single city query
citiesBtn.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
        array = [];
        console.log(event.target.innerHTML);
        const dataRef = collection(db, "user");
        const q = query(
            dataRef,
            where("city", "==", event.target.innerHTML),
            orderBy("time", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
        });
        console.log(array);
        renderValue();
    });
});

reset.addEventListener("click", GetDataFromFirestore);


async function GetDataFromFirestore() {
    array = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        array.push({ ...doc.data(), id: doc.id });
    });
    renderValue()
    console.log(array);
};
GetDataFromFirestore();


// add todo in database
form.addEventListener('submit', async event => {
    event.preventDefault()
    try {
        Div.innerHTML = ``;
        const docRef = await addDoc(collection(db, "users"), {
            title: title.value,
            description: description.value,
            time: Timestamp.fromDate(new Date()),
            Uid: auth.currentUser.uid
        })
        console.log("Document written with ID: ", docRef.id);
        array.push({
            title: title.value,
            description: description.value,
            id: docRef.id,
            city: select.value,
        });
        renderValue();
        title.value = ``;
        description.value = ``;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});




let deleteButton = document.querySelectorAll('.delete-btn');
let editButton = document.querySelectorAll('.edit-btn');




deleteButton.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
        console.log(array[index]);
        await deleteDoc(doc(db, "users", array[index].id));
        console.log("Data deleted");
        array.splice(index, 1);
        renderValue();
    });
});

editButton.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
        console.log(array[index]);
        const updatedNewTitle = prompt("enter new title");
        const updatedNewDescription = prompt("enter new description");
        const dataUpdate = doc(db, "users", array[index].id);
        await updateDoc(dataUpdate, {
            title: updatedNewTitle,
            description: updatedNewDescription
        });
        console.log("Data updated");
        array[index].description = updatedNewDescription;
        array[index].title = updatedNewTitle;
        renderValue();
    });
});





function renderValue() {
    Div.innerHTML = '';  // Clear previous entries in the main div
    if (array.length === 0) {
        Div.innerHTML = "no data found";
        return;
    }
    array.map((item) => {
        // Add new entries to the main div
        Div.innerHTML += `<div class="card d-flex justify-content-center">
            <div class="card-body ">
                <p><span class='h4'>Description:</span> ${item.title}</p>
                <p><span class='h4'>Title:</span> ${item.description}</p>
                <button type="button" class="btn button btn-danger delete-btn" >delete</button>
                <button type="button" class="btn button btn-success edit-btn">edit</button>
                </div>
                <p>${item.time ? item.time.toDate() : "no time"}</p>
            </div>
        <br/>`
    });
};



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

