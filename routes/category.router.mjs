import express from "express";
import { createCategory,getCategories,getCategory,removeCategory,updateCategory } from "../controllers/categories.controller.mjs";


const router = express.Router();

router.post('/categories',createCategory);
router.get('/categories/:name',getCategory);
router.get('/categories',getCategories);
router.delete('/categories/:id',removeCategory);
router.patch('/categories/:id',updateCategory);



export default router;