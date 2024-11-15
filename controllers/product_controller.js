import Product from "../db/models/product_model.js";
import multer from "multer";
import path from "path";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export const createProduct = async (req, res) => {
  const { name, category, subcategory } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const product = new Product({ name, category, subcategory, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ category: categoryId })
      .populate("category")
      .populate("subcategory");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, subCategory } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, category, subCategory, image },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: error.message });
  }
};
