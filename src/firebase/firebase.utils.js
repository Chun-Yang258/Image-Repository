import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// store sensitive info in .env
const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)

// function to create User Profile in firebase store
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    console.log("userRef:",userRef)
    const snapShot = await userRef.get();

    if(!snapShot.exist) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err){
            console.log("error creating user", err.message);
        }
    }
    return userRef;
};

// function to convert firebase snapshot correct format *When hooked up with search, may use reduce function to sort out format of output*
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { description, id, name, price, src, stock } = doc.data()

        return {
            description: description,
            id: id,
            name: name,
            price: price,
            src: src,
            stock: stock
        }
    })
    return transformedCollection
}

// function to add group of images
export const addImageCollection = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    });

    return await batch.commit()
}

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;