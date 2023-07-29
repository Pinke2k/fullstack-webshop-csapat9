import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './contexts/authProvider';
import { CartProvider } from './contexts/cartProvider';
import { ordersContext } from './contexts/ordersContext';
import { useState } from 'react';

function App() {
  const [orders, setOrders] = useState([]);

  return (
    <AuthProvider>
      <CartProvider>
        <ordersContext.Provider value={{ orders, setOrders }}>
          <RouterProvider router={router} />
        </ordersContext.Provider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
