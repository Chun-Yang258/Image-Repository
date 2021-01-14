import React from "react";

import { Form, FormControl, Button } from "react-bootstrap";

import "components/ProductSearch.scss";

export default function ProductSearch(props){

    const handleChange = e => {
        let keywords = e.target.value;
        console.log("k",keywords)
        props.setState(prevState => {
            return{
                ...prevState,
                searchTerm: keywords
            }
        })
    }

    return (
        <div className="product-search">
            <Form inline>
                <FormControl type="text" placeholder="What are you looking for?" className="mr-sm-2 w-50 border-info" value={props.term} onChange={handleChange} />
                <Button variant="outline-info" onClick={props.handleSearch}>Search</Button>
            </Form>
        </div>
        
    )
}