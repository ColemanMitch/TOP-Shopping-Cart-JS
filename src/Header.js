// Header.js

//import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './App.css';


const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand as={Link} to="/">Memes Store</Navbar.Brand>
    <Nav>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
        <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
        <Link to="/checkout">
        <div className="icon-div">
        <FontAwesomeIcon className="checkout-icon" icon={faShoppingCart} />(0)
        </div>
        </Link>
    </Nav>
  </Navbar>
  );
};

export default Header;