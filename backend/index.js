import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./db/dbStorage.js";
import { User, Product, Cart_Product } from "./db/dbSchema.js";
import { hashPassword, comparePassword } from "./encryption/hash.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// DB connection
dbConnection();

const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Server activated." });
});

app.post("/register", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty.",
      });
    }
    const client_data = req.body;
    console.log("Register client data : ", client_data);
    const existing_user = await User.findOne({
      user_email: client_data.user_email,
    });
    if (existing_user) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }
    client_data.user_password = await hashPassword(client_data.user_password);
    const user = await User.create(client_data);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty.",
      });
    }
    const client_data = req.body;
    console.log("Login client data : ", client_data);
    const user = await User.findOne({ user_email: client_data.user_email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exists.",
      });
    }
    const isPasswordMatch = await comparePassword(
      client_data.user_password,
      user.user_password
    );
    console.log("Is password match : ", isPasswordMatch);
    if (isPasswordMatch) {
      res.status(201).json({
        success: true,
        message: "User login successfully.",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Login failed.",
      });
    }
    console.log("user from db : ", user);
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});

app.get("/get_products", async (req, res) => {
  try {
    const products_list = await Product.find({});
    if (!products_list) {
      return res.status(404).json({
        success: false,
        message: "Products not found.",
      });
    }
    console.log("product_list", products_list);
    return res.status(200).json({
      success: true,
      message: products_list,
    });
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: product,
    });
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

// Admin
app.post("/admin_login", (req, res) => {
  try {
    const { admin_password } = req.body;
    if (!admin_password) {
      return res.status(404).json({
        success: true,
        message: "Password required.",
      });
    }
    if (admin_password === process.env.admin_password) {
      return res.status(200).json({
        success: true,
        message: "Admin login successfully.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Admin login failed.",
      });
    }
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.post("/insert_products", async (req, res) => {
  try {
    const client_product = req.body;
    console.log("client_product : ", client_product);
    const product_result = await Product.create(client_product);

    res.status(201).json({
      success: true,
      message: "Product inserted successfully.",
      product_result,
    });
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.delete("/delete_products/:id", async (req, res) => {
  try {
    const client_product_id = req.params.id;
    if (!client_product_id) {
      return res.status(404).json({
        success: false,
        message: "Product id required.",
      });
    }
    console.log("client_product : ", client_product_id);
    const deletion_result = await Product.findByIdAndDelete(client_product_id);
    console.log("deletion_result : ", deletion_result);

    res.status(201).json({
      success: true,
      message: "Product deleted successfully.",
      deletion_result,
    });
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.post("/add_to_cart", async (req, res) => {
  try {
    let message = "";
    const client_cart_data = req.body;
    if (
      !client_cart_data ||
      !client_cart_data.products ||
      client_cart_data.products.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message: "Products not found.",
      });
    }
    const client_cart_product_id = client_cart_data.products[0].product_id;
    let existing_cart_data = await Cart_Product.findOne({
      user_id: req.body.user_id,
    });
    if (!existing_cart_data) {
      console.log("No cart exists for this user");
      existing_cart_data = new Cart_Product({
        user_id: req.body.user_id,
        products: [
          {
            product_id: client_cart_data.products[0].product_id,
            product_name: client_cart_data.products[0].product_name,
            product_price: client_cart_data.products[0].product_price,
            product_image_url: client_cart_data.products[0].product_image_url,
            instock: client_cart_data.products[0].instock,
            quantity: 1,
          },
        ],
      });
      await existing_cart_data.save();
      // message = "New product added to cart successfully."
      res.status(201).json({
        success: true,
        message: "Product added to cart successfully.",
        existing_cart_data,
      });
      return;
    } else {
      const matchedProduct = existing_cart_data.products.find((item) => {
        return client_cart_product_id.toString() === item.product_id.toString();
      });

      if (matchedProduct) {
        matchedProduct.quantity += 1;
        // message = "Product quantity updated successfully.";
        res.status(201).json({
          success: true,
          message: "Product quantity updated successfully.",
          existing_cart_data,
        });
      } else {
        existing_cart_data.products.push({
          product_id: client_cart_data.products[0].product_id,
          product_name: client_cart_data.products[0].product_name,
          product_price: client_cart_data.products[0].product_price,
          product_image_url: client_cart_data.products[0].product_image_url,
          instock: client_cart_data.products[0].instock,
          quantity: 1,
        });
      }
      await existing_cart_data.save();

      res.status(201).json({
        success: true,
        message: "Product added to cart successfully.",
        existing_cart_data,
      });
    }
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.post("/get_cart_products", async (req, res) => {
  try {
    const { user_id } = req.body;
    console.log(user_id);
    const db_cart_products = await Cart_Product.findOne({ user_id: user_id });
    if (!db_cart_products) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
    console.log("db_cart_products : ", db_cart_products);

    res.status(201).json({
      success: true,
      db_cart_products,
    });
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.delete("/delete_cart_products/:id", async (req, res) => {
  try {
    const cart_product_id = req.params.id;
    const { user_id } = req.body;
    
    const cart_deletion_result = await Cart_Product.findOneAndUpdate(
      { user_id },
      { $pull: { products: {product_id : cart_product_id} } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Product deleted successfully.",
      cart_deletion_result
    });
  } catch (e) {
    console.log("ERROR : ", e.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.listen(port, () => {
  console.log(`\nServer activated at port ${port}\n`);
});
