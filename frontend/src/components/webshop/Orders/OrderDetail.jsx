import ordersFetch from '../../../services/orders-fetch';
import { useEffect, useState } from 'react';
import { timestampToDate } from '../../../services/timstampToDate';
export default function OrderDetail({ orderId }) {
  const [order, setOrder] = useState();
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ordersFetch.orderById(orderId).then((data) => {
      setOrder(data);
      setProducts(data?.products);
      data.products.forEach((product) => setPrice((prev) => prev + product.total_price));
    });
  }, []);
  return (
    <>
      <h1>Order Details {`(orderId: ${orderId})`}</h1>
      <div>
        <p>Termékek:</p>
        <ul>
          {products !== undefined
            ? products.map((product) => (
                <li>{`Termék neve: ${product?.product_name} | Termék id: ${product?.product_id} | Quantity: ${product.quantity} | Subtotal: ${product.total_price}`}</li>
              ))
            : 'Betöltés...'}
        </ul>
      </div>
      <div>Várható szállítási időpont: {timestampToDate(order?.deliver_date)}</div>
      <div>Rendelés ideje: {timestampToDate(order?.created)}</div>
      <div>Elküldtük e már a rendelést: {order?.is_done == 0 ? 'Nem' : 'Igen'}</div>
      <div>Végösszeg: {price}</div>
    </>
  );
}
