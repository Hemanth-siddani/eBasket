import React from "react";
import Layout from "./components/layout/Layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import PageNotFound from "./components/pages/PageNotFound";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import SingleProductPage from "./components/pages/SingleProductPage";
import Main from "./components/Main";
import AdminLogin from "./components/admin/admin_auth/AdminLogin";
import InsertProducts from "./components/admin/admin_auth/InsertProducts";
import DeleteProducts from "./components/admin/admin_auth/DeleteProducts";
import ChooseAdminOperation from "./components/admin/admin_auth/ChooseAdminOperation";
import Cart from "./components/pages/Cart";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Main/>}/>

          {/* Admin pages */}
          <Route path="/choose_admin_opertion" element={<ChooseAdminOperation/>}/>
          <Route path="/insert_products" element={<InsertProducts/>}/>
          <Route path="/delete_products" element={<DeleteProducts/>}/>

          {/* Customer pages */}
          <Route path="/products_list" element={<Home />} />
          <Route path="/admin_login" element={<AdminLogin />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
