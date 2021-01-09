import React, { useState, useEffect } from "react";
import { firestore, getUserInventoryCollection } from "../../firebase/firebase.utils";
import "./InventoryPage.scss";
import InventoryList from "./InventoryList";

export default function InventoryPage(props){

    const [inventory, setInventory] = useState([])

    useEffect(() => {
        const collectionRef = firestore.collection("images");
        let unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            if(props.currentUser){
                let inventoryList = getUserInventoryCollection(snapshot, props.currentUser.inventory)

                setInventory(inventoryList)
            }          
        })

        return function cleanup() {
            unsubscribeFromSnapshot();
        };
    },[props])

    return(
        <div className="panel panel-default">

            <table className="table table-bordered custom_outline">
            <thead>
                <tr>
                    <th colSpan="2">Image</th>
                    <th>Price</th>
                    <th>Qty Remaining</th>
                </tr>
            </thead>
            <tbody>
                <InventoryList inventory={inventory} />
            </tbody>
            </table>
        
        </div>
    )
}