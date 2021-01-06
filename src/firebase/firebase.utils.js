import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// store sensitive info in .env
const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;