import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import ordersFetch from '../../../services/orders-fetch';
import './Orders.css';
import OrderCard from './OrderCard';
import useAuth from '../../../hooks/useAuth';
import { ordersContext } from '../../../contexts/ordersContext';

const Orders = () => {
  const { orders, setOrders } = useContext(ordersContext);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (userId !== undefined) {
      ordersFetch
        .getOrders(userId)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setOrders(data);
          console.log(orders);
        });
    }
  }, []);
  return (
    <div className="ordercard-container">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order}></OrderCard>
      ))}
    </div>
  );
};
export default Orders;
