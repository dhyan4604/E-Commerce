import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import OrderConfirmation from '../pages/Orderconfirmation';
import AdminRoutes from './AdminRoutes';

const RouterRoutes = () => {
    useScrollRestore();

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/product-details/:productId" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* Admin routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Catch-all route */}
            {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
    );
};

export default RouterRoutes;
