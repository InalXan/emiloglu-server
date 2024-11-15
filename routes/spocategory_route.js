import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/spo_category.js";

router.post("/spocategories", createCategory);
router.get("/spocategories", getCategories);
router.put("/spocategories/:id", updateCategory);
router.delete("/spocategories/:id", deleteCategory);

export default router;
