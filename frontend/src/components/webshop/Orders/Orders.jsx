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
  console.log('orders', orders);
  useEffect(() => {
    if (userId !== undefined) {
      ordersFetch
        .getOrders(userId)
        .then((resp) => resp.json())
        .then((data) => {
          setOrders(data);
        });
    }
  }, []);
  return (
    <div className="ordercard-container">
      {orders.length === 0 ? (
        <h2>Nincsenek rendeléseid</h2>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id} orders={orders} setOrders={setOrders} order={order}></OrderCard>
        ))
      )}
    </div>
  );
};
export default Orders;
