import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";
import { firestore, getUserInventoryCollection } from "../../firebase/firebase.utils";
import "./InventoryPage.scss";
import InventoryList from "./InventoryList";
import { deleteUserImageInventoryItems } from "../../firebase/firebase.utils";

export default function InventoryPage(props){

    const [show, setShow] = useState(false);
    const [inventory, setInventory] = useState([])
    const [inventoryToDelete, setInventoryToDelete] = useState([])
    const [alert, setAlert] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // if signed in, then automatically redirect to shop page.
    let history = useHistory();
    useEffect(() => {
        if(!props.currentUser){            
            history.push("/");
        }
    })

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

    const handleMultipleItemsToDelete = () => {
        if(inventoryToDelete.length !== 0){
            deleteUserImageInventoryItems(inventoryToDelete);
        }else {
            setShow(false);
            setAlert(true);
        }              
    }

    return(
        <Fragment>
            <Alert show={alert} variant="danger" onClose={() => setAlert(false)} dismissible>
                <Alert.Heading>Oh snap!</Alert.Heading>
                <p>
                    Please select image to delete!
                </p>
            </Alert>
            <div className="panel panel-default">
                <table className="table table-bordered custom_outline">
                <thead>
                    <tr>
                        <th><img src="images/trash.png" alt="delete" className="trash" onClick={handleShow}/></th>
                        <th colSpan="2">Image</th>
                        <th>Price</th>
                        <th>Qty Remaining</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <InventoryList inventory={inventory} setInventoryToDelete={setInventoryToDelete} />
                </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">WARNING</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to DELETE selected images! Are you sure you want to proceed with this action?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="danger" onClick={handleMultipleItemsToDelete}>
                        DELETE
                    </Button>
                </Modal.Footer>
            </Modal>        
        </Fragment>
    )
}