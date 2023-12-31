import { useContext, useEffect } from 'react';
import { CartContext } from '../contexts/cartProvider';
import cartFetch from '../services/cart-fetch';
import useAuth from './useAuth';
import {toast} from "react-toastify"

export const useCart = () => {
  const { cartItems, totalPrice, fetchCartItems, updateCart } = useContext(CartContext);
  const { user } = useAuth();
  const id = user?.id;

  const updateCartItem = async (productId, quantity) => {
    try {
      await cartFetch.updateCart(id, productId, quantity);
      updateCart(productId, quantity);
    } catch (error) {
      console.error('Hiba a kosár elemek frissítésekor:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      if(!id){
        toast.warning('Bejelentkezés szükséges', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return
      }

      await cartFetch.createCartItem(id, productId, quantity);
      updateCart(productId, quantity);
      toast.success('Sikeresen hozzá adtad a kosárhoz!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error('Hiba a kosár elemek hozzáadása közben:', error);
      toast.error('Hiba a kosár elemek hozzáadása közben', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  

  const removeCart = async (productId) => {
    try {
      await cartFetch.deleteCart(id, productId);
      fetchCartItems();
      
    } catch (err) {
      console.error('hiba a termék törlése során');
      toast.error('Hiba a kosár törlése közben', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const removeCartItem = async (productId) => {
    try {
      await cartFetch.deleteCartItem(id, productId);
      fetchCartItems();
    } catch (err) {
      console.error('hiba a termék törlése során');
    }
  };

  const decrementAmount = async (productId) => {
    try {
      const currentQuantity = cartItems.find((item) => item.product_id === productId)?.quantity;
      if (currentQuantity !== undefined && currentQuantity > 1) {
        updateCartItem(productId, currentQuantity - 1);
      }
    } catch (error) {
      console.error('Hiba a kosár elemek törlése közben:', error);
    }
  };
  const incrementAmount = async (productId) => {
    try {
      const currentQuantity = cartItems.find((item) => item.product_id === productId)?.quantity;
      if (currentQuantity !== undefined) {
        updateCartItem(productId, currentQuantity + 1);
      }
    } catch (error) {
      console.error('Hiba a kosár elemek törlése közben:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCartItems();
    }
  }, []);

  return {
    cartItems,
    totalPrice,
    addToCart,
    incrementAmount,
    decrementAmount,
    removeCart,
    removeCartItem,
  };
};
