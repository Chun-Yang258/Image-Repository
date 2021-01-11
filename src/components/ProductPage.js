import React, { Fragment, useEffect, useState } from "react";
import ProductCardList from "components/ProductCardList";
import ProductSearch from "components/ProductSearch";
import { firestore, convertCollectionsSnapshotToMap } from "../firebase/firebase.utils";


export default function ProductPage(props){

    const [state, setState] = useState({
        searchTerm: "",
        imageCollection: []
    })

    // image database useEffect
    useEffect(() => {
        const collectionRef = firestore.collection("images");

        let unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            let imageCollection = convertCollectionsSnapshotToMap(snapshot)

            setState(prevState => {
                return{
                    ...prevState,
                    imageCollection: imageCollection
                }
            })
        })

        return function cleanup() {
            unsubscribeFromSnapshot();
        };
    }, [])
  

    return(
        <Fragment>
            <ProductSearch />
            <br />
            <ProductCardList products={state.imageCollection}/>
        </Fragment>
    )
}