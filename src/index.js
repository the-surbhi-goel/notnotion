import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKnOAlduKm1ucE3DMq3HM3VUC-qBT0hfQ",
  authDomain: "notnotion-2584b.firebaseapp.com",
  projectId: "notnotion-2584b",
  storageBucket: "notnotion-2584b.firebasestorage.app",
  messagingSenderId: "755531495491",
  appId: "1:755531495491:web:86eaa78a639eac06f37cf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const collectionRef = collection(db, "movies");
const dramaQRef = query(collectionRef, where("category", "==", "drama"), orderBy("createdAt"));
// const singleDocRef = collection(db, "movies", "any-document-id"); //uncomment it to check

// Get Document
getDocs(collectionRef)
  .then((data) => {
    let movies = [];
    data.docs.forEach((element) => {
      movies.push({ ...element.data(), id: element.id });
    });
    console.log(" movies ", movies);
  })
  .catch((error) => console.log(error));

// Get Document related to drama category
/*
getDocs(dramaQRef)
.then((data) => {
  let movies = [];
  data.docs.forEach((element) => {
    movies.push({ ...element.data(), id: element.id });
  });
  console.log("drama movies ", movies);
})
.catch((error) => console.log(error));
*/

// It'll call automatically after any call
onSnapshot(collectionRef, (data) => {
  console.log("changes");
  let movies = [];
  data.docs.forEach((element) => {
    movies.push({ ...element.data(), id: element.id });
  });
  console.log(" movies ", movies);
});

//   Adding a document
const addForm = document.querySelector(".addMovie");
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addDoc(collectionRef, {
    name: addForm.name.value,
    description: addForm.description.value,
    category: addForm.category.value,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).then(() => {
    alert("Movie Added");
    addForm.reset();
  });
});

// Delete a document
const deleteForm = document.querySelector(".deleteMovie");
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const docRef = doc(db, "movies", deleteForm.id.value);

  deleteDoc(docRef).then(() => {
    alert("Movie Deleted");
    deleteForm.reset();
  });
});

// Update a document
const updateForm = document.querySelector(".updateMovie");
updateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const docRef = doc(db, "movies", updateForm.id.value);

  updateDoc(docRef, {
    name: updateForm.name.value,
    description: updateForm.description.value,
    category: updateForm.category.value,
    updatedAt: serverTimestamp(),
  }).then(() => {
    alert("Movie Updated");
    updateForm.reset();
  });
});

// Register
const registerForm = document.querySelector(".signUp");
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  createUserWithEmailAndPassword(auth, registerForm.email.value, registerForm.password.value)
    .then((cred) => {
      console.log(cred);
      registerForm.reset();
    })
    .catch((error) => console.log(error));
});

// SignIn
const signInForm = document.querySelector(".signIn");
signInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  signInWithEmailAndPassword(auth, signInForm.email.value, signInForm.password.value)
    .then((cred) => {
      console.log(cred);
      signInForm.reset();
    })
    .catch((error) => console.log(error));
});

// Logout
const logoutForm = document.querySelector(".logout");
logoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  signOut(auth)
    .then(() => {
      console.log("Logged Out");
    })
    .catch((error) => console.log(error));
});
