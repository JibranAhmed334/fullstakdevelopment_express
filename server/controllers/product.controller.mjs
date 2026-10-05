import AsyncHandler from "express-async-handler";
import Product from "../models/product.model .mjs"
import upload_on_cloudinary from "../utils/cloudinary.utils.mjs";
import delete_from_cloudinary from "../utils/cloudinary.delete.utils .mjs"

const getAllproducts = AsyncHandler(async (req, res) => {
    const product = await Product.find().populate("category","category_name")
    const productCount = await Product.countDocuments()
    return res.status(200).json({
        massage: "get all producte",
        success: true,
        productCount,   
        product
    });
});

const createproduct = AsyncHandler(async (req, res) => {
    const { product_name, price, category } = req.body


    if (!product_name || !price || !category) {
        return res.status(400).json({
            massage: "please product provided",
            success: false
        });
    }

    if (!req.file){
        return res.status(400).json({
            masssage:"please provided produict image",
            success: false
        })
    }

    const product_image = await upload_on_cloudinary(req.file.path)

console.log("   product image",req.file);
console.log("   product image",product_image);
    // const productExists = await Product.findOne({ product_name: productName });
    // if (productExists) {
    //     return res.status(409).json({
    //         massage: "product already exists",
    //         success: false
    //     });
    // }

    const product = await Product.create({ 
        product_name,
         price, 
         category,
        product_image_url : product_image.secure_url,
           product_image_public_id : product_image.public_id

        });
    return res.status(201).json({
        massage: "create productes",
        success: true,
        product
    });
});

const getSingleproduct = AsyncHandler(async (req, res) => {
    const {id} =req.params

    const product =await Product.findById(id).populate("category","category_name")
    
 if (!product) {
        return res.status(404).json({
            massage: "product does not exists",
            success: false
        })
 }

    return res.status(200).json({ 
        massage: "get single producte", 
        success: true, 
         product });
});

const updateproduct = AsyncHandler(async (req, res) => {
    const { id } = req.params;

     const product =await Product.findById(id)
    
 if (!product) {
        return res.status(404).json({
            massage: "product does not exists",
            success: false
        })
 }

const updatedproduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ 
        massage: "update producte", 
        success: true,
        updatedproduct
     });
});

const deleteproduct = AsyncHandler(async (req, res) => {
    const { id } = req.params;

 const product =await Product.findById(id)
    
 if (!product) {
        return res.status(404).json({
            massage: "product does not exists",
            success: false
        })
 }
 await delete_from_cloudinary(product.product_image_public_id)
await Product.findByIdAndDelete(id)

    return res.status(200).json({ massage: "delete producte", success: true });


});

export { getAllproducts, createproduct, getSingleproduct, updateproduct, deleteproduct };