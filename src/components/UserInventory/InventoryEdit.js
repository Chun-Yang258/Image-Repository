import React, { useState } from "react";

import { Modal, Button, InputGroup, FormControl, Container, Col, Row } from "react-bootstrap";

import { updateImageCollection } from "../../firebase/firebase.utils";

export default function InventoryEdit(props){

    const [formParams, setFormParams] = useState(props.item);

    const handleEditSubmit = () => {
        updateImageCollection(formParams)
        props.handleEditClose();
    }

    const handleChange = e => {
        
        const { value, name } = e.target

        setFormParams(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <Modal show={props.showEdit} onHide={props.handleEditClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">WARNING</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12} md={7}>
                            <img alt={formParams.name} src={formParams.src} className="img-fluid" />
                        </Col>
                        <Col xs={6} md={5}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Price: $</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={formParams.price}
                                    name="price"
                                    onChange={handleChange}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Stocks:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={formParams.stock}
                                    name="stock"
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={6} md={12} className="custom__model">
                            <InputGroup className="mb-3">
                                <p>Description:</p>
                                <FormControl
                                    as="textarea"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={formParams.description}
                                    onChange={handleChange}
                                    rows="5"
                                    name="description"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleEditClose}>
                    CANCEL
                </Button>
                <Button variant="danger" onClick={handleEditSubmit}>
                    CONFIRM
                </Button>
            </Modal.Footer>
        </Modal>
        
    )
}