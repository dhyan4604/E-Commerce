import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import AddProduct from '../pages/Admin/Addproduct';
import BrandList from '../pages/Admin/Brandlist';
import Customers from '../pages/Admin/Customers';
import Orders from '../pages/Admin/Orders';
import ProductList from '../pages/Admin/Productlist';
import Header from '../pages/Admin/Header';
import Adminlogin from '../pages/Admin/Adminlogin';


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Adminlogin />} /> 
            <Route path="header" element={<Header />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="brandlist" element={<BrandList />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="productlist" element={<ProductList />} />
            {/* Catch-all route for undefined admin routes */}
            {/* <Route path="*" element={<h1>404 - Admin Page Not Found</h1>} /> */}
        </Routes>
    );
};

export default AdminRoutes;
