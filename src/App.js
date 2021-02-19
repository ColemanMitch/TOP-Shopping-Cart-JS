// Routes.js

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
//import Header from "./Header";
import Shop from "./Shop";
import Home from "./Home";
import Checkout from "./Checkout";
import { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap'

function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}


const App = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNumOfItems, setTotalNumOfItems] = useState(0)
  
  const addToCart = (x) => {
    const idPreviouslyExist = obj => obj.id === x.id;
    if (cart.find(idPreviouslyExist)) {
      console.log('ID previously existed, increment the object')
      let ix = findWithAttr(cart, 'id', x.id)
      const updatedCart = cart;
      updatedCart[ix].quantity++;
      setCart(updatedCart)
      updateNumOfItemsInCart(updatedCart)
    } else {
      x.quantity = 1
      setCart(cart => [...cart, x]);
      console.log(cart)
      setTotalNumOfItems(totalNumOfItems + 1);
    }
    console.log('add this to the cart')
    console.log(x)
    setTotalPrice(totalPrice+x.price)
    console.log(totalPrice);
  } 

  const updateNumOfItemsInCart = (tempCart) =>
  {
    const sum = tempCart.reduce((a, {quantity}) => a + quantity, 0);
    console.log(sum)
    setTotalNumOfItems(sum);
  }

  const removeItemFromCart = (id) => {
    console.log('remove item with id of ' + String(id) + ' from cart completely');
    let index = cart.findIndex(function(i){
      return i.id === id;
    })
    console.log(index)
    if (index !== -1) {
      let newCart = [...cart]; // make a separate copy of the array
      newCart.splice(index, 1);
      setCart(newCart);
      updateNumOfItemsInCart(newCart);
      const newSum = newCart.reduce(function (item, obj) { return item + (obj.quantity*obj.price); }, 0); // 7
      setTotalPrice(newSum)
    } 
    console.log(cart)
  }

  const incrementOne = (id) => {
    let index = cart.findIndex(function(i){
      return i.id === id;
    })
    const newCart = cart;
    newCart[index].quantity++;
    setCart(newCart)
    updateNumOfItemsInCart(newCart)
    setTotalPrice(totalPrice+newCart[index].price)

  }

  const decrementOne = (id) => {
    let index = cart.findIndex(function(i){
      return i.id === id;
    }) //index of 
    let newCart = [...cart];
    
    if (newCart[index].quantity >= 1) {
      newCart[index].quantity--;
    } 
    else if (newCart[index].quantity === 1)
    {
      //newCart[index].quantity 
      newCart.splice(index, 1);
      console.log(newCart);
    } 
    
    updateNumOfItemsInCart(newCart);
    const newSum = newCart.reduce(function (item, obj) { return item + (obj.quantity*obj.price); }, 0); // 7
    setTotalPrice(newSum)
    let newCartPt2 = newCart.filter(function( obj ) {
      return obj.quantity !== 0;
    });
    setCart(newCartPt2);
}

  
   
  
  const updateItemNumber = (item) => {
    const updatedCart = cart;
    let ix = findWithAttr(updatedCart, 'id', item.id)
    console.log(ix, item.id, updatedCart);
    updatedCart[ix].quantity = parseInt(document.getElementById('quantity-'+item.id).value);
    setCart(updatedCart);
    updateNumOfItemsInCart(updatedCart);
    const newSum = updatedCart.reduce(function (item, obj) { return item + (obj.quantity*obj.price); }, 0); // 7
    setTotalPrice(newSum)
    let updatedCart2 = updatedCart.filter(function( obj ) {
      return obj.quantity !== 0;
    });
    setCart(updatedCart2);
    //console.log(item)
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand as={Link} to="/">Memes Store</Navbar.Brand>
    <Nav>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
        <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
        <Link to="/checkout">
        <div className="icon-div">
        <FontAwesomeIcon className="checkout-icon" icon={faShoppingCart} />({totalNumOfItems})
        </div>
        </Link>
    </Nav>
  </Navbar>
    <Switch>
      <Route exact path="/checkout" component={Checkout}><Checkout cart={cart} totalPrice={totalPrice} updateItemNumber={updateItemNumber} removeItemFromCart={removeItemFromCart}/></Route>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/shop" component={Shop}><Shop cart={cart} addToCart={addToCart} incrementOne={incrementOne} decrementOne={decrementOne}/></Route>
    </Switch>
  </Router>
  );
};

export default App;