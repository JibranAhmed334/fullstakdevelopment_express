import AsyncHandler from "express-async-handler";
import Category from "../models/category.model.mjs";

const getAllCategories = AsyncHandler(async (req, res) => {
    const categories = await Category.find();
    return res.status(200).json({
        massage: "get all categories",
        success: true,
        data: categories
    });
});

const createCategory = AsyncHandler(async (req, res) => {
    const categoryName = req.body.category_name ?? req.body.Category_name ?? req.body.categoryName ?? req.body.catogery_name ?? req.body.catogeryname;

    if (!categoryName) {
        return res.status(400).json({
            massage: "please category provided",
            success: false
        });
    }

    const categoryExists = await Category.findOne({ category_name: categoryName });
    if (categoryExists) {
        return res.status(409).json({
            massage: "category already exists",
            success: false
        });
    }

    const category = await Category.create({ category_name: categoryName });
    return res.status(201).json({
        massage: "create categories",
        success: true,
        category
    });
});

const getSingleCategory = AsyncHandler(async (req, res) => {
    const {id} =req.params

    const category =await Category.findById(id)
    
 if (!category) {
        return res.status(404).json({
            massage: "category does not exists",
            success: false
        })
 }

    return res.status(200).json({ 
        massage: "get single categories", 
        success: true, 
         category });
});

const updateCategory = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const categoryName = req.body.category_name ?? req.body.Category_name ?? req.body.categoryName ?? req.body.catogery_name ?? req.body.catogeryname;

    const category = await Category.findById(id);
    
 if (!category) {
        return res.status(404).json({
            massage: "category does not exists",
            success: false
        })
 }

    if (!categoryName) {
        return res.status(400).json({
            massage: "please category provided",
            success: false
        });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { category_name: categoryName },
        { new: true, runValidators: true }
    );

    return res.status(200).json({ 
        massage: "update categories", 
        success: true,
        updatedCategory
     });
});

const deleteCategory = AsyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    
 if (!category) {
        return res.status(404).json({
            massage: "category does not exists",
            success: false
        })
 }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({ massage: "delete categories", success: true });
});

export { getAllCategories, createCategory, getSingleCategory, updateCategory, deleteCategory };