import React, { createContext, useState, useEffect } from 'react';
import ordersFetch from '../services/orders-fetch';
import useAuth from '../hooks/useAuth';

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { user } = useAuth();
  const userId = user?.id;

  const fetchOrders = async () => {
    try {
      const ordersData = await ordersFetch.getOrders(userId);
      if (ordersData) {
        console.log('ordersData.orders ', ordersData.orders);
        setOrders(ordersData.orders);
      }
    } catch (error) {
      console.error('Hiba a megrendelt elemek letöltésekor:', error);
    }
  };
  const deleteOrder = async () => {};

  useEffect(() => {
    if (id) {
      fetchOrders();
    }
  }, []);

  return (
    <OrdersContextContext.Provider value={{ orders, fetchOrders }}>
      {children}
    </OrdersContextContext.Provider>
  );
};
