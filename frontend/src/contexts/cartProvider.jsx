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

  useEffect(() => {
    if (id) {
      fetchCartItems();
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, fetchCartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
