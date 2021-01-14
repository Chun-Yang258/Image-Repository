import React, { Fragment, useEffect, useState } from "react";
import ProductCardList from "components/ProductCardList";
import ProductSearch from "components/ProductSearch";
import { firestore, convertCollectionsSnapshotToMap, searchProductByName } from "../firebase/firebase.utils";


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

    const handleSearch = async () => {

        searchProductByName(state.searchTerm).then(data => {
            setState(prevState => {
                return{
                    ...prevState,
                    imageCollection: data
                }
            })
        })
    }
  

    return(
        <Fragment>
            <ProductSearch term={state.searchTerm} setState={setState} handleSearch={handleSearch} />
            <br />
            <ProductCardList products={state.imageCollection}/>
        </Fragment>
    )
}