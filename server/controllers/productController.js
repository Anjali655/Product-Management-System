// const Product = require("../models/ProductModel");
import Product from "../models/ProductModel.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, basePrice, variants } = req.body;
    const newProduct = new Product({ name, description, basePrice, variants });
    const savedProduct = await newProduct.save();
    console.log("Saved Product:", savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a variant to a product
export const addVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { variantName, stock } = req.body;
    const newVariant = { variantName, stock };
    product.variants.push(newVariant);
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a variant
export const deleteVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.variants.id(req.params.variantId).remove();
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adjust inventory for a product/variant
export const adjustInventory = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const variant = product.variants.id(req.params.variantId);
    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }
    variant.stock = req.body.stock;
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports = {
//   createProduct,
//   getProducts,
//   updateProduct,
//   deleteProduct,
//   addVariant,
//   deleteVariant,
//   adjustInventory,
// };
