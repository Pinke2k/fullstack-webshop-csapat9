import { timestampToDate } from '../../../services/timstampToDate';
import './Orders.css';
import ordersFetch from '../../../services/orders-fetch';

const OrderCard = (props) => {
  return (
    <>
      <div className="orderCard">
        <button onClick={() => ordersFetch.deleteOrder(props.order.id)} className="delete-order">
          x
        </button>
        <div className="orderId">Rendelés id: {props.order.id}</div>
        <div className="userId">User id: {props.order.user_id}</div>
        <div className="order-sent-date">
          Rendelés időpontja: {timestampToDate(props.order.created)}
        </div>
        <div className="order-delivery-date">
          Várható szállítási nap: {timestampToDate(props.order.deliver_date)}
        </div>
        <div className="order-status">
          Rendelés teljesítve: {props.order.is_done === 0 ? 'Nem' : 'Igen'}
        </div>
        <button className="btn">További infó</button>
      </div>
    </>
  );
};
export default OrderCard;
