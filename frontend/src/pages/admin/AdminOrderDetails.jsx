import AdminOrderDetails from '../../components/admin/AdminOrderDetails/AdminOrderDetails';

const AdminOrderDetailss = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get('orderId');
  return <AdminOrderDetails orderId={orderId} />;
};

export default AdminOrderDetailss;
