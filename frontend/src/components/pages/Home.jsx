import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/css_for_pages/Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const [product_array, set_product_array] = useState([]);
  const navigate = useNavigate();

  const productResponse = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get_products");
      set_product_array(response.data.message);
    } catch (e) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    productResponse();
  }, []);

  const handleClick = (product_id) => {
    try {
      console.log("handleClick triggered..!",product_id);
      navigate(`/product/${product_id}`);
    } catch(e) {
      console.log("ERROR : ",e);
    }
  }
  return (
    <div className="product-container">
      {product_array.map((product) => (
        <div key={product._id} className="product-card" onClick={() => handleClick(product._id)}>
          
          <img
            src={product.product_image_urls.image_01}
            alt={product.product_name}
            className="product-image"
          />

          <h3 className="product-title">
            {product.product_name}
          </h3>

          <p className="product-price">
            ₹ {product.product_price}
          </p>

        </div>
      ))}
    </div>
  );
}

export default Home;

