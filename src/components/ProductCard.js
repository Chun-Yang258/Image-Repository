import React, { useState } from "react";

import { Card, Button, Modal, Container, Row, Col } from "react-bootstrap";
import "components/ProductCard.scss";

export default function ProductCard(props){

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const handleAddItem = (e) => {
        e.preventDefault()
        // add item to shopping cart
        const { description, id, name, price, src, stock } = props;
        props.setCart(prevCart => {

            let objectToAdd = {
                description: description,
                id: id,
                name: name,
                price: price,
                src: src,
                stock: stock
            };

            // check if it is the same item
            if(!prevCart.some(item => item.id === objectToAdd.id)){
                console.log("not include:",prevCart)
                let newCart = [objectToAdd, ...prevCart]
                return newCart;
            }
           
            return prevCart;
        })
        setShow(false);
    }

    let btn_color = props.stock === 0 ? "secondary" : "primary";
    let formatted_description = props.description.length > 135 ? props.description.slice(0, 135) + " ..." : props.description

    return(
        <Card className="custom_card shadow mb-5 bg-white rounded">
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
                    <Button variant={btn_color} size="sm" className="image-button-animation" disabled={props.stock === 0} onClick={handleAddItem}>Add to Cart</Button>
                    <Button variant="info" size="sm" className="float-right" onClick={handleShow}>Details >></Button>
                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>{props.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={7}>
                                        <img alt={props.name} src={props.src} className="img-fluid" />
                                    </Col>
                                    <Col xs={6} md={5}>
                                        <p>Price: ${props.price}</p>
                                        <br />
                                        <p>{props.stock === 0 ? "Not Available" : "In Stock"}</p>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs={6} md={12} className="custom__model">
                                        {props.description}
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" className="image-button-animation" disabled={props.stock === 0} onClick={handleAddItem}>
                                Add to Cart
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div> 
            </Card.Footer>                
        </Card>
    )
}