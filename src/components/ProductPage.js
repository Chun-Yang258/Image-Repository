import React, { Fragment } from "react";
import ProductCardList from "components/ProductCardList";
import ProductSearch from "components/ProductSearch";

export default function ProductPage(props){
    return(
        <Fragment>
            <ProductSearch />
            <br />
            <ProductCardList products={props.products} />
        </Fragment>
    )
}