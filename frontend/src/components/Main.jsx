import React, { useState } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";

function Main() {
  const [role, set_role] = useState("");
  const navigate = useNavigate();

  const submitRole = (e) => {
    e.preventDefault();
    if(role === "customer") {
        navigate("/login");
    }
    if(role === "admin") {
        navigate("/admin_login");
    }
    console.log(role);
  };

  return (
    <>
      <div className="main_container">
        <div className="role_card">
          <h1 className="main_title">Welcome to eBasket</h1>
          <p className="main_subtitle">Choose your role to continue</p>

          <form onSubmit={submitRole}>
            <select
              className="role_select"
              onChange={(e) => set_role(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>

            <button type="submit" className="main_submit_button">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Main;
