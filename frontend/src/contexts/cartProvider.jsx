import React, { createContext, useState, useEffect } from 'react';
import cartFetch from '../services/cart-fetch';
import useAuth from '../hooks/useAuth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { user } = useAuth();
  const id = user?.id;

  const fetchCartItems = async () => {
    try {
      const cartData = await cartFetch.getCartItems(id);
      if (cartData) {
        setCartItems(cartData.cartItems);
        setTotalPrice(cartData.totalPrice);
      }
    } catch (error) {
      console.error('Hiba a kosár elemek letöltésekor:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCartItems();
    }
  }, [id]);

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
