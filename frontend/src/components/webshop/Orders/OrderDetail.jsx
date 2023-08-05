import ordersFetch from '../../../services/orders-fetch';
import { useEffect, useState } from 'react';
import { timestampToDate } from '../../../services/timstampToDate';
import './OrderDetail.css';
export default function OrderDetail({ orderId }) {
  const [order, setOrder] = useState();
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ordersFetch.orderById(orderId).then((data) => {
      setOrder(data);
      setProducts(data?.products);
      const totalPrice = data.products.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.total_price;
      }, 0);
      setPrice(totalPrice);
    });
  }, []);
  return (
    <>
      <div className="orderDetail-container">
        <h1 className="orderName">Rendelés adatai</h1>
        <h2>Termékek:</h2>
        <ul className="products-list">
          {products !== undefined
            ? products.map((product) => (
                <li>{`Termék neve: ${product?.product_name} | Termék id: ${product?.product_id} | Quantity: ${product.quantity}db | Subtotal: ${product.total_price}Ft`}</li>
              ))
            : 'Betöltés...'}
        </ul>
        <div className="orderDetail">Rendelés azonosító: {orderId}</div>
        <div className="orderDetail">
          Várható szállítási időpont: {timestampToDate(order?.deliver_date)}
        </div>
        <div className="orderDetail">Rendelés ideje: {timestampToDate(order?.created)}</div>
        <div className="orderDetail">
          Elküldtük e már a rendelést: {order?.is_done == 0 ? 'Nem' : 'Igen'}
        </div>
        <div className="orderDetail">Végösszeg: {`${price}Ft`}</div>
      </div>
    </>
  );
}
