import './AdminOrders.css';
import { useEffect, useContext } from 'react';
import ordersFetch from '../../../services/orders-fetch';
import '../../webshop/Orders/Orders.css';
import OrderCard from '../..//webshop/Orders/OrderCard';
import { allOrdersContext } from '../../../contexts/allOrdersContext';

const AdminOrders = () => {
  const { allOrders, setAllOrders } = useContext(allOrdersContext);

  useEffect(() => {
    ordersFetch.allOrders().then((data) => {
      setAllOrders(data);
    });
  }, []);
  return (
    <div className="ordercard-container">
      {allOrders.map((order) => (
        <OrderCard
          key={order.id}
          orders={allOrders}
          setOrders={setAllOrders}
          order={order}
        ></OrderCard>
      ))}
    </div>
  );
};
export default AdminOrders;
