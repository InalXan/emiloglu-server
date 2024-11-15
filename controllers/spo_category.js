import SpoCategory from "../db/models/sponsor_category.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new SpoCategory({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await SpoCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await SpoCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await SpoCategory.findByIdAndDelete(id);
    if (deletedCategory) {
      res.status(200).json({ message: "Category deleted" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
