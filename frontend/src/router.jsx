import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/webshop/Layout/Layout';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminLayout } from './components/admin/Layout/AdminLayout';
import { Notfound } from './pages/Notfound';
import Login from './components/webshop/Login/Login';
import Register from './components/webshop/Register/Register';
import Profile from './pages/webshop/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ,
      {
        path: '/user/login',
        element: <Login />,
      },
      {
        path: '/user/register',
        element: <Register />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/products',
        element: <AdminProducts />,
      },
    ],
  },
  {
    path: '*',
    element: <Notfound />,
  },
]);

export default router;
