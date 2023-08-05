import React, { createContext, useState, useEffect, useContext } from 'react';
import cartFetch from '../services/cart-fetch';
import useAuth from '../hooks/useAuth';
import AuthContext from './authProvider';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const {auth} = useContext(AuthContext)

  
  const { user } = useAuth();
  const token = auth?.accessToken;
  // console.log(token,'auth')
  const id = user?.id
  // console.log(token,'user')
  
  useEffect(() => {
    if (id && token) {
      console.log(token,'efffedt')
      fetchCartItems();
    }
  }, [id,token]);

  const fetchCartItems = async () => {
    try {
      const cartData = await cartFetch.getCartItems(id,auth?.accessToken);
      if (cartData) {
        setCartItems(cartData.cartItems);
        setTotalPrice(cartData.totalPrice);
      }
    } catch (error) {
      console.error('Hiba a kosár elemek letöltésekor:', error);
    }
  };

  const updateCart = (productId, quantity) => {
    const cartDataItems = cartItems.map((item) => {
      if (item.product_id === productId) {
        return { ...item, quantity: quantity, subtotal: quantity * item.price };
      } else {
        return item;
      }
    });
    const updatetotalPrice = cartDataItems.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.subtotal;
    }, 0);
    setTotalPrice(updatetotalPrice);
    setCartItems(cartDataItems);
  };


  return (
    <CartContext.Provider value={{ cartItems, totalPrice, fetchCartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
