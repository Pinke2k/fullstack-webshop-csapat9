import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './contexts/authProvider';
import { CartProvider } from './contexts/cartProvider';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
