import React, { useState } from "react";
import "../admin_css/AdminLogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [admin_password, set_admin_password] = useState("");
  const navigate = useNavigate();

  const handleAdminPassword = async (e) => {
    e.preventDefault();
    try {
          const response = await axios.post("http://localhost:8080/admin_login", {
      admin_password,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/choose_admin_opertion");
    } else {
      toast.error(response.data.message);
    }
    } catch(e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">
            <form
              onSubmit={handleAdminPassword}
              className="bg-white border rounded-4 shadow-sm p-4 p-md-5"
            >
              <h3 className="text-center mb-4 fw-semibold fs-2">Admin Login</h3>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Admin password"
                  className="form-control form-control-lg"
                  onChange={(e) => set_admin_password(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 fw-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
