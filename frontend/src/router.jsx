import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/webshop/Layout/Layout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminLayout from './components/admin/Layout/AdminLayout';
import { Notfound } from './pages/Notfound';
import Login from './pages/webshop/Login';
import Register from './pages/webshop/Register';
import Products from './pages/webshop/Products';
import AboutUs from './pages/webshop/AboutUs';
import Cart from './components/webshop/Cart/Cart';
import Contact from './pages/webshop/Contact';
import Home from './pages/webshop/Home';
import Orders from './pages/webshop/Orders';
import Profile from './pages/webshop/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDeleteProduct from './pages/admin/AdminDeleteProduct';
import AdminModifyProduct from './pages/admin/AdminModifyProduct';
import AdminCustomers from './pages/admin/AdminCustomer';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrdersDetails from './pages/admin/AdminOrderDetails';
import AdminNewCategory from './pages/admin/AdminNewCategory';
import AdminCategoryList from './pages/admin/AdminCategoryList';
import AdminDeleteCategory from './pages/admin/AdminDeleteCategory';
import AdminModifyCategory from './pages/admin/AdminModifyCategory';
import CreateProduct from './pages/admin/CreateProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        //index: true,
        element: <Home />,
      },
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
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/aboutus',
        element: <AboutUs />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/products',
        element: <AdminProducts />,
      },
      {
        path: '/admin/create-product',
        element: <CreateProduct />,
      },
      {
        path: '/admin/products/:id/delete',
        element: <AdminDeleteProduct />,
      },
      {
        path: '/admin/products/:id/update',
        element: <AdminModifyProduct />,
      },
      {
        path: '/admin/customers',
        element: <AdminCustomers />,
      },
      {
        path: '/admin/orders',
        element: <AdminOrders />,
      },
      {
        path: '/admin/orders/:id',
        element: <AdminOrdersDetails />,
      },
      {
        path: '/admin/categories/new-category',
        element: <AdminNewCategory />,
      },
      {
        path: '/admin/categories',
        element: <AdminCategoryList />,
      },
      {
        path: '/admin/categories/:id/delete',
        element: <AdminDeleteCategory />,
      },
      {
        path: '/admin/categories/:id/update',
        element: <AdminModifyCategory />,
      },
    ],
  },
  {
    path: '*',
    element: <Notfound />,
  },
]);

export default router;
