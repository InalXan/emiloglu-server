import express from 'express';
const router = express.Router();
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category_controller.js';

router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;