import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteProducts() {
  const [products_list, set_products_list] = useState([]);

  const showProductList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get_products");
      set_products_list(response.data.message);
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };

  useEffect(() => {
    showProductList();
  }, []);

  const handleDelete = async (product_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete_products/${product_id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);

        const updatedProducts = products_list.filter(
          (product) => product._id !== product_id
        );
        set_products_list(updatedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="container my-3">
      <div className="card shadow-sm rounded-4 mb-3">
        <div className="card-body p-3">
          {products_list.map((product) => (
            <div className="row align-items-center m-3" key={product._id}>
              {/* Image */}
              <div className="col-3 text-center">
                <img
                  src={product.product_image_urls.image_01}
                  alt="product"
                  className="img-fluid rounded"
                  style={{ maxHeight: "120px", objectFit: "contain" }}
                />
              </div>

              {/* Details */}
              <div className="col-6">
                <h6 className="fw-bold mb-1">{product.product_name}</h6>
                <p className="text-danger fw-semibold mb-1">
                  ₹{product.product_price}
                </p>
                <span className="badge bg-success">
                  Instock : {product.instock}
                </span>
              </div>

              {/* Delete */}
              <div className="col-3 text-end">
                <button
                  className="btn btn-danger btn-sm px-3 rounded-pill"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeleteProducts;
