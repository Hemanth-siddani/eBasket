import React from "react";
import Header from "./Header"
import Footer from "./Footer"
import { ToastContainer} from 'react-toastify';
import "../styles/css_for_layout/Layout.css";
function Layout({ children }) {
  return (
    <>
      <div>
        <ToastContainer/>
        <Header/>
        <section className="content">{children}</section>
        <Footer/>
      </div>
    </>
  );
}

export default Layout;
