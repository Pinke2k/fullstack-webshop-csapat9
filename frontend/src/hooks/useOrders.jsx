import { useContext, useEffect } from 'react';
import { OrdersContext } from '../contexts/ordersProvider';
import ordersFetch from '../services/orders-fetch';
import useAuth from './useAuth';

export const useOrders = () => {
  const { orders, fetchOrders } = useContext(OrdersContext);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, []);
};
