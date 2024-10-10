import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  variantName: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true },
  variants: [variantSchema],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
