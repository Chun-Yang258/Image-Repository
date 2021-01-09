import React, { useState, useEffect } from "react";
import { firestore, getUserInventoryCollection } from "../../firebase/firebase.utils";
import "./InventoryPage.scss";

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
    console.log(inventory)
    const inventoryBody = inventory.map(item => {
        const { description, id, name, price, src, stock } = item
        return (
            <tr key={id}>
                <td className="image_space">
                    <img src={src} alt={name} width="100%" className="img-thumbnail" />
                </td>
                <td >
                    <h4>{name}</h4>
                    <br />
                    <p>{description}</p>
                </td>
                <td >
                    {price}
                </td>
                <td >
                    {stock}
                </td>
                <td >
                    <img src="images/trash.png" alt="delete" className="trash"/>
                </td>
            </tr>
          )
    })

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
                {inventoryBody}
            </tbody>
            </table>
        
        </div>
    )
}