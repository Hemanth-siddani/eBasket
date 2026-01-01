import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/css_for_pages/SingleProductPage.css";
import { toast } from "react-toastify";

function SingleProductPage() {
  const { id } = useParams();
  const [single_product, set_single_product] = useState(null);
  const [image_link, set_image_link] = useState("");

  useEffect(() => {
    const singleProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/${id}`
        );
        set_single_product(response.data.message);
        set_image_link(response.data.message.product_image_urls.image_01);
      } catch (e) {
        console.log("ERROR:", e);
      }
    };

    singleProductData();
  }, [id]);

  const imageHoverEvent = (image_url) => {
    set_image_link(image_url);
  };

  const handleCart = async (product_id,product_name,product_price,product_image_url,instock) => {
    try {
      const user_id = sessionStorage.getItem("user_id");

      const response = await axios.post(
        "http://localhost:8080/add_to_cart",
        {
          user_id: user_id,
          products: [{ product_id,product_name,product_price,product_image_url,instock}],
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  if (!single_product) {
    return <h3 className="m-5">Loading product...</h3>;
  }

  return (
    <>
      <div className="single_product_container">
        <div className="d-flex flex-wap m-3 align-items-center">
          <div className="image_thumbnails_container">
            <img
              src={single_product.product_image_urls.image_01}
              alt=""
              className="thumbnail_image"
              onMouseEnter={() =>
                imageHoverEvent(single_product.product_image_urls.image_01)
              }
            />
            <img
              src={single_product.product_image_urls.image_02}
              alt=""
              className="thumbnail_image"
              onMouseEnter={() =>
                imageHoverEvent(single_product.product_image_urls.image_02)
              }
            />
            <img
              src={single_product.product_image_urls.image_03}
              alt=""
              className="thumbnail_image"
              onMouseEnter={() =>
                imageHoverEvent(single_product.product_image_urls.image_03)
              }
            />
          </div>

          <div
            className="image_screen"
            style={{ backgroundImage: `url(${image_link})` }}
          ></div>
        </div>

        <div className="m-3 product_details_section">
          <h2 className="m-3 fs-1 product_title">
            {single_product.product_name}
          </h2>
          <span className="m-3 fs-4 product_price text-success">
            ₹{single_product.product_price}
          </span>
          <p className="m-3 product_description">
            {single_product.product_description}
          </p>
        </div>

        <div className="m-3 product_actions_section">
          <div className="buttons_container">
            <button
              className="add_to_cart_button m-2"
              onClick={() => handleCart(single_product._id,single_product.product_name,single_product.product_price,single_product.product_image_urls.image_01,single_product.instock)}
            >
              Add to cart
            </button>
            <button className="buy_now_button m-2">Buy now</button>
          </div>

          <div className="m-3 stock_container">
            <div className="m-3 fs-3 text-success stock_status">
              Instock : {single_product.instock}
            </div>
            <div className="m-3 stock_location">
              Location : {single_product.product_address}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductPage;
