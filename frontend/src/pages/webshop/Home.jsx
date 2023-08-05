import { ordersContext } from '../../contexts/ordersContext';
import ordersFetch from '../../services/orders-fetch';
import { useContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const { orders, setOrders } = useContext(ordersContext);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    console.log('userid', userId);
    if (userId !== undefined) {
      ordersFetch
        .getOrders(userId)
        .then((resp) => resp.json())
        .then((data) => {
          setOrders(data);
          console.log(orders);
        });
    }
  }, []);
  return <div>Home</div>;
};

export default Home;
