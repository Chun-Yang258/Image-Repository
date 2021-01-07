import React, {Fragment} from "react";

import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.utils";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "components/NavBar.scss";

export default function NavBar(props){

    let title = (
        <Fragment>
            <p>Welcome,</p>
            <p>{props.currentUser ? (props.currentUser.displayName ? props.currentUser.displayName : "User" ) : ""}</p>
        </Fragment>     
        )
    return (
        <Navbar className="custom_nav" variant="dark" sticky="top">
            <Navbar.Brand href="#home">
                <img
                    src="images/logo.png"
                    alt="Images Shop"
                    className="img-fluid"
                />
            </Navbar.Brand>
            
            <Nav className="ml-auto p-2 navbar-item">
                <Nav.Link as={Link} to="/">SHOP</Nav.Link>
                {props.currentUser ? 
                    <NavDropdown title={title} id="basic-nav-dropdown" className="name">
                        <NavDropdown.Item className="text-center" href="#action/3.1">ORDER</NavDropdown.Item>             
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="logout text-center" onClick={() => auth.signOut()}>SIGN OUT</NavDropdown.Item>
                    </NavDropdown> : 
                    <Nav.Link as={Link} to="/signin">SIGN IN</Nav.Link>}
                <Nav.Link href="#features" className="icon-container">                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
                    <span className="badge badge-pill badge-danger troop-level-badge">0</span>
                </Nav.Link>
            </Nav>            
        </Navbar>
    )
}