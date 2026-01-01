import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function InsertProducts() {
  const [product_name, set_product_name] = useState("");
  const [product_price, set_product_price] = useState("");
  const [product_description, set_product_description] = useState("");
  const [product_address, set_product_address] = useState("");
  const [image_01, set_image_01] = useState("");
  const [image_02, set_image_02] = useState("");
  const [image_03, set_image_03] = useState("");

  const [instock, set_instock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/insert_products",
        {
          product_name,
          product_price,
          product_description,
          product_address,
          product_image_urls: {
            image_01,
            image_02,
            image_03,
          },
          instock
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <form
              className="bg-white border rounded-3 p-4 shadow-sm"
              onSubmit={handleSubmit}
            >
              <h2 className="text-center mb-5 fw-semibold">Insert Product</h2>

              <div className="mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product title"
                  onChange={(e) => set_product_name(e.target.value)}
                  value={product_name}
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product price"
                  onChange={(e) => set_product_price(e.target.value)}
                  value={product_price}
                  required
                />
              </div>

              <div className="mb-5">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Product description"
                  onChange={(e) => set_product_description(e.target.value)}
                  value={product_description}
                  required
                ></textarea>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product address"
                  onChange={(e) => set_product_address(e.target.value)}
                  value={product_address}
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="1st image url"
                  onChange={(e) => set_image_01(e.target.value)}
                  value={image_01}
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="2nd image url"
                  onChange={(e) => set_image_02(e.target.value)}
                  value={image_02}
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="3rd image url"
                  onChange={(e) => set_image_03(e.target.value)}
                  value={image_03}
                  required
                />
              </div>

              <div className="mb-4">
                <select
                  className="form-select"
                  onChange={(e) => set_instock(e.target.value)}
                  value={instock}
                  required
                >
                  <option value="">Is product in stock?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold mt-4"
              >
                Insert
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsertProducts;
