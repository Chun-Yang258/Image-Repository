import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// store sensitive info in .env
const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)

// function to create User Profile in firebase store
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();
    if(!snapShot.exists) {
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

// function to get User inventory image
export const getUserInventoryCollection = (collections, inventoryArray) => {
    let inventoryList = []
    collections.docs.forEach(item => {
        if(inventoryArray.includes(item.id)){
            const { description, id, name, price, src, stock } = item.data()
            inventoryList.push({
                description: description,
                id: id,
                name: name,
                price: price,
                src: src,
                stock: stock
            }) 
        }
    })

    return inventoryList;
}

// function to add single image to storage
export const addImageStorage = (file, fileInfo) => {
    storage.ref(`images/${file.name}`)
    .getDownloadURL()
    .catch((error)=>{
        switch (error.code){
            case 'storage/object-not-found':
                // File doesn't exist
                // if not exist then continue
                const uploadTask = storage.ref(`images/${file.name}`).put(file);
                uploadTask.on(
                    "state_changed",
                    snapshot => {},
                    err => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(file.name)
                            .getDownloadURL()
                            .then(url => {
                                // get the public url of image and pass it to database image reference
                                const collectionRef = firestore.collection("images").doc();
                                const {displayName, description, price, stock} = fileInfo
                                const imageId = collectionRef.id
                                collectionRef.set({
                                    storageRef: file.name,
                                    description: description,
                                    id: imageId,
                                    name: displayName,
                                    price: Number(price),
                                    src: url,
                                    stock: Number(stock)
                                }).then(( ) => {
                                    // get the id and create inventory in user
                                    const user = firebase.auth().currentUser;
                                    if(user != null){
                                        const uid = user.uid;
                                        const userRef = firestore.collection("users").doc(uid);
                                        userRef.update({
                                            inventory: firebase.firestore.FieldValue.arrayUnion(imageId)
                                        })
                                    }
                                })
                            })    
                    }
                )
                break;

            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;

            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break; 
            default:
                break;
        }     
    })
};    

export const deleteUserImageInventoryItems = async (objectsToDelete) => {

    const user = firebase.auth().currentUser;
    if(user !== null){
        const collectionRef = firestore.collection("images");
        const userRef = firestore.collection("users").doc(user.uid);
        const fileRef = storage.ref("images");

        objectsToDelete.forEach(object => {

            const docRef = collectionRef.doc(object.id)
            docRef.get().then((doc) => {

                userRef.update({
                    inventory: firebase.firestore.FieldValue.arrayRemove(object.id)
                })
                collectionRef.doc(object.id).delete();
                fileRef.child(doc.data().storageRef).delete();
            })
        })
    }   
}

// function to add images reference to User Inventory
//export const addImageReferenceToUserInventory = async () = {};

// function to add group of images to database
export const addImageCollection = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    });

    return await batch.commit()
}

// helper function
// const getRandomID = () => {
//     return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
// }


// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;