import mongoose from "mongoose";

const user_schema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_phone_number: {
    type: String,
    required: true,
  },
},{timestamps: true});

const product_schema = mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_address: {
    type: String,
    required: true,
  },
  product_image_urls: {
    image_01: {
      type: String,
      required: true,
    },
    image_02: {
      type: String,
      required: true,
    },
    image_03: {
      type: String,
      required: true,
    },
  },
  instock: {
    type: String,
    required: true,
  },
},{timestamps: true});


const cart_schema = mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      required: true,
    },

    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          // ref: "Product",
          required: true,
        },
        product_name: {
          type : String,
          required: true
        },
        product_price: {
          type: String,
          required: true
        },
        product_image_url: {
          type: String,
          required: true
        },
        instock: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true
        },
      },
    ],
  },
  {timestamps: true});

export const User = mongoose.model("user", user_schema);
export const Product = mongoose.model("product", product_schema);
export const Cart_Product = mongoose.model("cartdata", cart_schema);
