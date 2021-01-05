import React from "react";

import { CardDeck } from "react-bootstrap";

import "components/ProductCardList.scss";

import ProductCard from "components/ProductCard";

export default function ProductCardList(props){

    let productList = props.products.map(product => (
        <ProductCard 
            key={product.id} {...product}
        />
    ))

    return (
        <CardDeck className="custom_deck">
            {productList}
        </CardDeck>
    )
}