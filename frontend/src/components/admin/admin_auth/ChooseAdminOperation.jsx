import React, { useState } from "react";
import "../admin_css/ChooseAdminOperation.css"
import { useNavigate } from "react-router-dom";

function ChooseAdminOperation() {
  const [role, set_role] = useState("");
  const navigate = useNavigate();

  const submitOperation = (e) => {
    e.preventDefault();
    if(role === "insert") {
        navigate("/insert_products");
    }
    if(role === "delete") {
        navigate("/delete_products");
    }
    console.log(role);
  };

  return (
    <>
      <div className="choose_admin_opertion_container">
        <div className="operation_card">
          <h1 className="main_title">Admin opertion</h1>
          <p className="main_subtitle">Choose operation to continue</p>

          <form onSubmit={submitOperation}>
            <select
              className="role_select"
              onChange={(e) => set_role(e.target.value)}
            >
              <option value="">Select opertion</option>
              <option value="insert">Insert products</option>
              <option value="delete">Delete products</option>
            </select>

            <button type="submit" className="operation_submit_button">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChooseAdminOperation;
