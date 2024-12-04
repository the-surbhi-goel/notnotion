import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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
