import Category from "../db/models/category_model.js";

export const createCategory = async (req, res) => {
  const { name, parentCategoryId } = req.body;
  try {
    const category = new Category({ name });

    if (parentCategoryId) {
      const parentCategory = await Category.findById(parentCategoryId);
      parentCategory.subcategories.push(category._id);
      await parentCategory.save();
    }

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};