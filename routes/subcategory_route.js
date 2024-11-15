import express from "express";
const router = express.Router();
import Subcategory from "../db/models/subcategory_model.js";

// Get all subcategories
router.get("/subcategories", async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a subcategory
router.post("/add/subcategories", async (req, res) => {
  const subcategory = new Subcategory({
    name: req.body.name,
    category: req.body.category,
  });

  try {
    const newSubcategory = await subcategory.save();
    res.status(201).json(newSubcategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a subcategory
router.put("/subcategories/:id", async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory)
      return res.status(404).json({ message: "Subcategory not found" });

    subcategory.name = req.body.name;
    subcategory.category = req.body.category;
    await subcategory.save();
    res.json(subcategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a subcategory

router.delete("/subcategories/:id", async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory)
      return res.status(404).json({ message: "Subcategory not found" });

    await Subcategory.deleteOne({ _id: req.params.id }); // ID'ye göre silme işlemi
    res.json({ message: "Subcategory deleted successfully" });
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
