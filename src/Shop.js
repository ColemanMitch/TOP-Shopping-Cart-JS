import React, { useEffect, useState } from "react";
import './App.css';

const maymays = [
    {
        id: 1,
        name: "Dancing Pallbearers",
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2020-12/11/14/asset/d4e6376292bd/sub-buzz-3075-1607697005-6.png?downsize=800:*&output-format=auto&output-quality=auto",
        price: 19.99
    },
    {
        id: 2,
        name: "Smooth Brain",
        image: "https://pbs.twimg.com/media/EK1Pb0QU8AAbES3?format=jpg&name=900x900",
        price: 14.99
    },
    {
        id: 3,
        name: "They don't know...",
        image: "https://i.imgflip.com/4pn1an.png",
        price: 9.98
    },
    {   
        id: 4,
        name: "Me still processing...",
        image: "https://pbs.twimg.com/media/EoEbFudVcAA08oi?format=jpg&name=900x900",
        price: 3.20
    },
    {
        id: 5,
        name: "12 foot tall Home Depot Skeleton",
        image: "https://pbs.twimg.com/media/Eio2C9ZXcAEHFlF?format=jpg&name=small",
        price: 1999.99
    },
    {
        id: 6,
        name: "I am once again asking",
        image: "https://btrtoday.sfo2.digitaloceanspaces.com/uploads/20200210074258/EQTRwF0WsAAEGvP.jpg",
        price: 2020
    }
];

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}


const Shop = (props) => {
    useEffect(() => {
        console.log('mounting');
        
    });

  return (
    <div>
      <h1>Shop</h1>
      <hr></hr>
      <div class="shop">
      {maymays.map(meme => (
          <div className="shop-item">
          <img src={meme.image} alt={"Picture of "+meme.name}></img>
          <p>{meme.name} - ${meme.price.toFixed(2)}</p>
          {findWithAttr(props.cart, 'id', meme.id) === -1 || props.cart[findWithAttr(props.cart, 'id', meme.id)].quantity === 0
          ? 
          <div>
          <button onClick={() => props.addToCart(meme)}>Add to Cart</button> 
          <p></p>
          </div>
          :
          <div>
          <button className="decrement-btn" onClick={() => props.decrementOne(meme.id)}>-</button><button className="increment-btn" onClick={() => props.incrementOne(meme.id)}>+</button>
          <p>Currently in cart: {props.cart[findWithAttr(props.cart, 'id', meme.id)].quantity}</p>
          </div>
          }
          </div>
      ))}
        </div>
    </div>
  );
};

export default Shop;
