import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user_name, set_user_name] = useState("");
  const [user_email, set_user_email] = useState("");
  const [user_password, set_user_password] = useState("");
  const [user_phone_number, set_user_phone_number] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        { user_name, user_email, user_password, user_phone_number }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">

            <form
              className="bg-white border rounded-4 shadow-sm p-4 p-md-5"
              onSubmit={handleSubmit}
            >
              <h2 className="text-center mb-4 fw-semibold">
                Register
              </h2>

              <div className="row g-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={user_name}
                    onChange={(e) => set_user_name(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={user_email}
                    onChange={(e) => set_user_email(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={user_password}
                    onChange={(e) => set_user_password(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={user_phone_number}
                    onChange={(e) => set_user_phone_number(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 p-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold py-2"
                  >
                    Register
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
