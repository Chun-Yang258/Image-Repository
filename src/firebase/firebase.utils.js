import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCveppCGZwk6gbJ4mQDuzuEDOrayj-yGRI",
    authDomain: "image-repository-db.firebaseapp.com",
    projectId: "image-repository-db",
    storageBucket: "image-repository-db.appspot.com",
    messagingSenderId: "695179209039",
    appId: "1:695179209039:web:1aeba2b1ced0daee4a7d3a",
    measurementId: "G-M103PSE5BR"
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;