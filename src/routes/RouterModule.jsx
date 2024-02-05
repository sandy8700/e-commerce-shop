import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AdminDashboard from "../admin/AdminDashboard";
import PrivateRoute from './PrivateRoute';
import ForgotPassword from "../pages/ForgotPassword";
import Cart from "../pages/Cart";

const RouterModule = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/products" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route
          path="/admin/*"
          element={<PrivateRoute element={<AdminDashboard />} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
        </Routes>
      </Router>
    </>
  );
};

export default RouterModule;
