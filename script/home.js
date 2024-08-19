// Import Firebase authentication and Firestore modules
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

import { auth, db } from "../config.js";

// Select the logout button, form, title input, description input, and main div from the DOM
const logout = document.querySelector("#logout");
let form = document.querySelector('#form');
let title = document.querySelector('#title');
let description = document.querySelector('#Description');
let Div = document.querySelector('#MainDiv');
const select = document.querySelector("#select");
const citiesBtn = document.querySelectorAll(".cities-btn");
const reset = document.querySelector(".reset");

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        console.log('user login nahi ha');
        window.location = '../index.html';
    }
});

// Handle logout button click
logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = '../index.html';
    }).catch((error) => {
        console.log(error.message);
    });
});

// Global array to store data
let array = [];

// Handle city selection and query Firestore for documents matching the selected city
citiesBtn.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
        array = [];
        const cityName = event.target.innerHTML;
        console.log(cityName);
        const dataRef = collection(db, "users");
        const q = query(
            dataRef,
            where("city", "==", cityName),
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

// Handle reset button click to retrieve all documents from Firestore
reset.addEventListener("click", GetDataFromFirestore);

async function GetDataFromFirestore() {
    array = [];  // Reset array
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        array.push({ ...doc.data(), id: doc.id });
    });
    renderValue();
    console.log(array);
};
GetDataFromFirestore();

// Handle form submission to add a new document to Firestore
form.addEventListener('submit', async event => {
    event.preventDefault();


    try {
        Div.innerHTML = ``;
        const docRef = await addDoc(collection(db, "users"), {
            title: title.value,
            description: description.value,
            city: select.value,
            time: Timestamp.fromDate(new Date()),
            Uid: auth.currentUser.uid  // Store the current user's UID
        });
        console.log("Document written with ID: ", docRef.id);
        // GetDataFromFirestore();
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

// Function to render the data stored in the global array
function renderValue() {
    Div.innerHTML = '';
    if (array.length === 0) {
        Div.innerHTML = "no data found";
        return;
    }
    array.map((item, index) => {
        // Add new entries to the main div
        Div.innerHTML += `<div class="card d-flex border mb-3 justify-content-center">
            <div class="card-body ">
            <p><span class='h4'>Title:</span> ${item.title}</p>
                <p><span class='h4'>Description:</span> ${item.description}</p>
                <button type="button" class="btn button btn-danger delete-btn" data-index="${index}">delete</button>
                <button type="button" class="btn button btn-success edit-btn" data-index="${index}">edit</button>
            </div>
            <p>${item.time ? item.time.toDate() : "no time"}</p>
        </div>
        <br/>`;
    });

    // Select all delete and edit buttons again after rendering the HTML
    let deleteButton = document.querySelectorAll('.delete-btn');
    let editButton = document.querySelectorAll('.edit-btn');

    // Handle delete button click to remove document from Firestore
    deleteButton.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const index = event.target.getAttribute('data-index');
            console.log(array[index]);
            await deleteDoc(doc(db, "users", array[index].id));
            console.log("Data deleted");
            array.splice(index, 1);
            renderValue();
        });
    });

    // Handle edit button click to update a document in Firestore
    editButton.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const index = event.target.getAttribute('data-index');
            console.log(array[index]);
            const updatedNewTitle = prompt("enter new title", array[index].title);
            const updatedNewDescription = prompt("enter new description", array[index].description);
            const dataUpdate = doc(db, "users", array[index].id);
            await updateDoc(dataUpdate, {
                title: updatedNewTitle,
                description: updatedNewDescription
            });
            if (updatedNewTitle !== ``) {
                array[index].title = updatedNewTitle;
            };
            if (updatedNewDescription !== ``) {
                array[index].description = updatedNewDescription;
            };
            renderValue();
            console.log("Data updated");
        });
    });
}
