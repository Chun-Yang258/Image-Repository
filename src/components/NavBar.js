import React, {Fragment} from "react";

import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.utils";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "components/NavBar.scss";

export default function NavBar(props){
    let title = (
        <Fragment> 
            <span><img src="images/user.png" alt="User" width="20px"/>{props.currentUser ? (props.currentUser.displayName ? props.currentUser.displayName : "User" ) : ""}</span>
        </Fragment>     
        )
    return (
        <Navbar className="custom_nav" variant="dark" sticky="top">
            <Navbar.Brand href="/">
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
                        <NavDropdown.Item className="text-center" as={Link} to="/inventory">INVENTORY</NavDropdown.Item>             
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="text-center" as={Link} to="/upload">UPLOAD</NavDropdown.Item> 
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="logout text-center" onClick={() => auth.signOut()}>SIGN OUT</NavDropdown.Item>
                    </NavDropdown> : 
                    <Nav.Link as={Link} to="/signin">SIGN IN</Nav.Link>}
            </Nav>            
        </Navbar>
    )
}