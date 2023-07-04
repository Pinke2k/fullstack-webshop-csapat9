import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import Layout from './components/webshop/Layout/Layout';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminLayout } from './components/admin/Layout/AdminLayout';
import { Notfound } from './pages/Notfound';
import Login from './components/webshop/Login/Login';
import Register from "./components/webshop/Register/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/admin/login',
        element: <AdminLogin />,
      },
      {
        path: "/user/login",
        element: <Login/>
      },
      {
        path: "/user/register",
        element: <Register/>
      }
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
