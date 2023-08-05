import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './contexts/authProvider';
import { CartProvider } from './contexts/cartProvider';
import { ordersContext } from './contexts/ordersContext';
import { useState } from 'react';
import { allOrdersContext } from './contexts/allOrdersContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  return (
    <AuthProvider>
      <CartProvider>
        <ordersContext.Provider value={{ orders, setOrders }}>
          <allOrdersContext.Provider value={{ allOrders, setAllOrders }}>
            <RouterProvider router={router} />
            <ToastContainer />
          </allOrdersContext.Provider>
        </ordersContext.Provider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
