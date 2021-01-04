import React from "react";

import { Form, FormControl, Button } from "react-bootstrap";

import "components/ProductSearch.scss";

export default function ProductSearch(props){
    return (
        <div className="product-search">
            <Form inline>
                <FormControl type="text" placeholder="What are you looking for?" className="mr-sm-2 w-50 border-info" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </div>
        
    )
}