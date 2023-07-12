import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './contexts/authProvider';



function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
