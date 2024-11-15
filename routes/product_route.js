import express from "express";
const router = express.Router();
import {
  upload,
  createProduct,
  getProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "../controllers/product_controller.js";

router.post("/products", upload.single("image"), createProduct);
router.get("/products", getProducts);
router.get("/products/by-category/:categoryId", getProductsByCategory);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
