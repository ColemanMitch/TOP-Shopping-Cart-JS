import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Checkout = (props) => {
  return (
      props.totalPrice !==0 ? 
    <div>
      <h1>Checkout</h1>
      <hr></hr>
        <div className="checkout-table">
        <table>
            <tr>
                <th></th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
            </tr>
        {props.cart.map(item => (
        <tr>
            <td><img className="checkout-img" src={item.image} alt={"Picture of "+item.name}></img></td>
            <td>{item.name}</td>
            <td><input id={"quantity-"+item.id} type="number" min="0" max="99" value={item.quantity} onChange={() => props.updateItemNumber(item)}></input></td>
            <td>${item.price.toFixed(2)}</td>
            <td>${(item.price*item.quantity).toFixed(2)}</td>
            <td><FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => props.removeItemFromCart(item.id)}/></td>
        </tr>
        ))}
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="grand-total">Grand Total</td>
            <td className="grand-total">${props.totalPrice.toFixed(2)}</td>
            <td></td>
        </tr>
        </table>
        </div>
    </div>:
    <div>
      <h1>Checkout</h1>
      <hr></hr>
      <center>
      <img src="https://www.mercurysolutions.co/app/webroot/img/empty_cart.png"></img>
      </center>
      </div>
  );
};

export default Checkout;
