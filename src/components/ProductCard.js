import React from "react";

import { Card, Button } from "react-bootstrap";
import "components/ProductCard.scss";

export default function ProductCard(props){

    let btn_color = props.stock === 0 ? "secondary" : "primary";
    let formatted_description = props.description.length > 135 ? props.description.slice(0, 135) + " ..." : props.description

    return(
        <Card className="custom_card">
            {props.stock === 0 && <span className="custom_card__sold">sold out</span> }
            <span className="custom_card__price">${props.price}</span>
            <Card.Img variant="top" className="custom_card__img" src={props.src} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <hr/>
                <Card.Text>
                    {formatted_description}
                </Card.Text>               
            </Card.Body>
            <Card.Footer>
                <div className="custom_card__footer">
                    <Button variant={btn_color} size="sm" disabled={props.stock === 0}>Add to Cart</Button>{' '}
                    <Button variant="info" size="sm" className="float-right">Details >></Button>{' '}
                </div> 
            </Card.Footer>                
        </Card>
    )
}