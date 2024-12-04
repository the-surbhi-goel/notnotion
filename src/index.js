import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

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
const collectionRef = collection(db, "movies");

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
