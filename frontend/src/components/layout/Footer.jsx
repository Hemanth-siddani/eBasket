import React from "react";
import { NavLink } from "react-router-dom";
import { LiaOpencart } from "react-icons/lia";
import "../styles/css_for_layout/Footer.css";
function Footer() {
  return (
    <>
      <div className="footer container-fluid">
        <div className="d-flex justify-content-evenly align-items-center flex-column">
          <div className="fs-1 m-3 main_title_logo">
            <span>eBasket</span>
            <LiaOpencart />
          </div>
          <div className="m-3">&copy; Allrights reserved</div>
          <div className="d-flex gap-2 m-3">
            <NavLink to="/">Home</NavLink>|
            <NavLink to="/about">About</NavLink>|
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
