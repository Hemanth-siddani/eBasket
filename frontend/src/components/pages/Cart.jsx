
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
  let [cart_data, set_cart_data] = useState([]);

  // const handleDelete = async (product_id) => {
  //   try {
  //     console.log("Delete cart product : ",product_id);
  //     const user_id = sessionStorage.getItem("user_id");  
  //     const response = await axios.delete(`http://localhost:8080/delete_cart_products/${product_id}`,{user_id : user_id});

  //     if(response.data.success) {
  //       toast.success(response.data.message);

  //       const updatedProducts = cart_data.filter(
  //         (product) => product.product_id !== product_id
  //       );
  //       set_cart_data(updatedProducts);
        
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch(e) {
  //     toast.error(e.response.data.message);
  //   }
  // }

  const handleDelete = async (product_id) => {
  try {
    const user_id = sessionStorage.getItem("user_id");
    
    const response = await axios.delete(
      `http://localhost:8080/delete_cart_products/${product_id}`, 
      { data: { user_id } } 
    );

    if (response.data.success) {
      toast.success(response.data.message);
      // Update UI locally
      const updatedProducts = cart_data.filter(
        (product) => product.product_id !== product_id
      );
      set_cart_data(updatedProducts);
    }
  } catch (e) {
    toast.error(e.response?.data?.message);
  }
};
  const displayCart = async () => {
    const user_id = sessionStorage.getItem("user_id");
    try {
      const response = await axios.post(
        "http://localhost:8080/get_cart_products",
        { user_id }
      );

      if (response.data.success) {
        let x = response.data.db_cart_products["products"];
        set_cart_data(x);
      } else {
        toast.error(response.data.success);
      }
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };

  useEffect(() => {
    displayCart();
  }, []);

  useEffect(() => {
    console.log(cart_data);
  }, [cart_data]);

  return (
    <div className="container my-3 p-3">
      <div className="card shadow-sm rounded-4 mb-3 p-3">
        <div className="card-body p-3">

          {cart_data.length === 0 && (
            <p className="text-center text-muted">Cart is empty</p>
          )}

          {cart_data.map((item) => (
            <div
              className="row align-items-center m-5"
              key={item.product_id}
            >
              {/* Image */}
              <div className="col-3 text-center">
                <img
                  src={item.product_image_url}
                  alt="product"
                  className="img-fluid rounded"
                  style={{ maxHeight: "120px", objectFit: "contain" }}
                />
              </div>

              {/* Details */}
              <div className="col-6">
                <h6 className="fw-bold mb-1">
                  {item.product_name}
                </h6>

                <p className="text-danger fw-semibold mb-1">
                  ₹{item.product_price}
                </p>

                <p className="mb-1">
                  Quantity : <strong>{item.quantity}</strong>
                </p>

                <span className="badge bg-success">
                  Instock : {item.instock}
                </span>
              </div>

              {/* Actions (UI only) */}
              <div className="col-3 text-end">
                <button  className="btn btn-danger btn-sm mt-2 px-3 rounded-pill" onClick={() => handleDelete(item.product_id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Cart;
