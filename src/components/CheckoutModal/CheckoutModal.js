import React from "react";
import { Modal, Button } from "react-bootstrap";
import CheckoutItem from "./CheckoutItem";
import "./Checkout.scss";

export default function CheckoutModal(props){

    const handleRemove = (itemToRemove) => {
        let new_cart = props.cart.filter(item => item.id !== itemToRemove.id)

        props.setCart(new_cart);
    }

    let sum = 0;
    let checkoutList = props.cart.map(item => {
        let converted_price = Number(item.price)
        sum += converted_price
        return <CheckoutItem key={item.id} item={item} handleRemove={handleRemove} />
    })
    sum = sum.toFixed(2);
    let tax = (sum * 0.13).toFixed(2);
    let total = (sum * 1.13).toFixed(2);

    const emptyTbody = (
        <tr>
            <td colSpan="4" className="text-center text-info font-weight-bold">You do not have any checkout image!</td>
        </tr>
    )

    

    return (
        <Modal
            onHide={props.onHide}
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    CHECKOUT
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="panel panel-default">
                    <table className="table table-bordered custom_outline">
                    <thead>
                        <tr>
                            <th colSpan="2">Selected Images</th>
                            <th>Price</th>
                            <th><img src="images/trash.png" alt="delete" className="trash" onClick={() => props.setCart([])} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.cart.length ? checkoutList : emptyTbody}
                    </tbody>
                    </table>          
                </div>
                <div className="totalPrice">
                    <hr />
                    <p className="text-right">SUM: ${sum}</p>
                    <p className="text-right">GST/HST: ${tax}</p>
                    <p className="text-right">TOTAL: ${total}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Checkout</Button>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}