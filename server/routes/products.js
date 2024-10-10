import express from "express";
// const {
//   createProduct,
//   getProducts,
//   updateProduct,
//   deleteProduct,
//   addVariant,
//   deleteVariant,
//   adjustInventory,
// } = require("../controllers/productController");

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addVariant,
  deleteVariant,
  adjustInventory,
} from "../controllers/productController.js";

const router = express.Router();

// Product routes
router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Variant routes
router.post("/:id/variants", addVariant);
router.delete("/:id/variants/:variantId", deleteVariant);
router.put("/:id/variants/:variantId/inventory", adjustInventory);

export default router;
