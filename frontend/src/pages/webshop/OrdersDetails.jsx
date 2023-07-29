import OrderDetail from '../../components/webshop/Orders/OrderDetail';

export default function OrdersDetails() {
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get('orderId');
  return <OrderDetail orderId={orderId} />;
}
