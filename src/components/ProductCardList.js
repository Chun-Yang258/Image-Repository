import React, { useState, useEffect, Fragment } from "react";

import { CardDeck } from "react-bootstrap";

import "components/ProductCardList.scss";

import ProductCard from "components/ProductCard";
import CheckoutModal from "./CheckoutModal/CheckoutModal";

export default function ProductCardList(props){

    const [cart, setCart] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    // retrieve shopping cart data in localStorage 
    useEffect(() => {
        const cartData = localStorage.getItem("shopping_cart_data")
        if(cartData){
            setCart(JSON.parse(localStorage.getItem("shopping_cart_data")))
        }
    }, [])

    // change shopping cart data in localStorage when cart data changed
    useEffect(() => {
       localStorage.setItem("shopping_cart_data", JSON.stringify(cart)) 
    }, [cart])

    // Filter out deleted item from shopping cart

    let productList = props.products.map(product => (
        <ProductCard
            setCart={setCart}
            key={product.id} 
            {...product}
        />
    ))

    return (
        <Fragment>
            <CardDeck className="custom_deck">
                {productList}
            </CardDeck>           
            <button type="button" className="cart-container shadow float-right rounded-pill btn btn-success" onClick={() => setModalShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>
                <span className="badge badge-pill badge-danger cart-level-badge">{cart.length}</span>
            </button>
            <CheckoutModal show={modalShow} onHide={() => setModalShow(false)} cart={cart} setCart={setCart}/>
        </Fragment>
    )
}