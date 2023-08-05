import { timestampToDate } from '../../../services/timstampToDate';
import './Orders.css';
import ordersFetch from '../../../services/orders-fetch';
import { useNavigate } from 'react-router-dom';

const OrderCard = (props) => {
  const navigate = useNavigate();

  function deleteUserOrders(orderId) {
    ordersFetch.deleteOrder(orderId);
    const newOrders = props.orders.filter((order) => orderId !== order.id);
    props.setOrders(newOrders);
  }
  return (
    <>
      <div className="orderCard">
        <button onClick={() => deleteUserOrders(props.order.id)} className="delete-order">
          x
        </button>
        <div className="order-data">Rendelés azonosító: {props.order.id}</div>
        <div className="order-data">Rendelés időpontja: {timestampToDate(props.order.created)}</div>
        <div className="order-data">
          Várható szállítási nap: {timestampToDate(props.order.deliver_date)}
        </div>
        <div className="order-data">
          Rendelés teljesítve: {props.order.is_done === 0 ? 'Nem' : 'Igen'}
        </div>
        <button
          onClick={() => {
            console.log(window.location);
            if (window.location.href.includes('admin')) {
              navigate(`/admin/orders/${props.order.id}?orderId=${props.order.id}`);
            } else {
              navigate(`/orders/${props.order.id}?orderId=${props.order.id}`);
            }
          }}
          className="btn"
        >
          További infó
        </button>
      </div>
    </>
  );
};
export default OrderCard;
