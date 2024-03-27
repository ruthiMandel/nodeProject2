import mongoose from "mongoose";
import { ProductModel } from "../models/product.js"
import Joi from "joi";

//params חובה /api/course/1
//queryparams אופציונלים /api/course?txt=a




export const getAllProduct = async (req, res, next) => {

    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 30;
    // if(req.xxx)
    try {
        let allProduct = await ProductModel.find({
            // $or:
            //     [{ productName: txt }]
        }).skip((page - 1) * perPage).limit(perPage);
        //pagination
        res.json(allProduct)

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }
}
export const getProductById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
        // return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let product = await ProductModel.findById(id);
        if (!product)
            return res.status(404).json({ type: "no id", message: "no product with such id" })
        return res.json(product)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}






export const deleteProduct = async (req, res) => {
    let { id } = req.params;
    // const errors = productValidator(req.body);
    // console.log(errors)
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let product = await ProductModel.findByIdAndDelete(id);
        if (!product)
            return res.status(404).json({ type: "no product to delete", message: "no product with such id to delete" })
        // if (req.user.role != "ADMIN" && product._Id != req.user._id)
        //     res.status(403).json({ type: "not allowed", message: "you are not allowed to delete course only manager or if you added this course" })
        product =await ProductModel.findByIdAndDelete(id)
        return res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}

export const addProduct = async (req, res) => {
    let { productName,productImg,description,price,category,size,metal} = req.body;

    if (!productName )
        return res.status(404).json({ type: "missing params", message: "missing details in body productName " })

    // const errors =  await Joi.productValidator(req.body);
    // console.log(errors)
    try {
        const sameProduct = await ProductModel.findOne({ productName: productName,size:size});
        if (sameProduct)
            return res.status(409).json({ type: "same details", message: "there is already same product" })
        // if (req.user.role != "ADMIN" )
        //     res.status(403).json({ type: "not allowed", message: "you are not allowed to delete course only manager or if you added this course" })
        let newProduct= new ProductModel({productName,productImg,description,price,category,size,metal});
        await newProduct.save();
        return res.json(newProduct)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}


export const updateProduct = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let product = await ProductModel.findById(id);
        if (!product)
            return res.status(404).json({ type: "product not found", message: "no product with such id" })
        let updated = await ProductModel.findByIdAndUpdate(id, req.body, { new: true })

        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}
// export const getProductByCategory1 = async (req, res) => {
//     let  {category } = req.params;
//     let txt=req.query.txt||undefined;
//     let page = req.query.page || 1;
//     let perPage = req.query.perPage || 30;
//     try {
//         // if (!mongoose.isValidObjectId(id)) {
//         //     res.status(400);
//         //     throw new Error('קוד לא הגיוני')
//         // }
//         // return res.status(400).json({ type: "not valid id", message: "id not in right format" })
//         let product = await ProductModel.find({category:category}).skip(page-1)*perPage.limit(parseInt(perPage));
//         if (!product)
//             return res.status(404).json({ type: "no id", message: "no product with such id" })
//         return res.json(product)

//         }catch (err) {
//         console.log(err)
//         res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
//     }

// }
export const getProductByCategory = async (req, res,next) => {
    let { category } = req.params;
    let txt = req.query.txt || undefined;
    let page = parseInt(req.query.page) || 1;
    let perPage = parseInt(req.query.perPage) || 30;

    try {
        let products = await ProductModel.find({ category: category }).skip((page - 1) * perPage).limit(perPage);

        if (!products ) {
            return res.status(404).json({ type: "not found", message: "לא נמצאו מוצרים עבור הקטגוריה הנתונה" });
        }

        return res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", message: "לא ניתן לקבל את המוצרים" });
    }
}
export const getTotalProductByCategory = async (req, res) => {
    let { category } = req.params;


    try {
        let count = await ProductModel.find({ category: category }).count();
        return res.json(count)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}
