import Joi from 'joi';
import mongoose from 'mongoose'
 export const productSchema = mongoose.Schema({
    productName:String,
    description:String,
    productImg:String,
    price:Number,
    category:String,
    size:Number,
    metal:String
})
export const ProductModel = mongoose.model("products", productSchema);
export const productValidator = (_product) => {
    const productValidationSchema = Joi.object().keys({
        productName: Joi.string().required(),
        description: Joi.string().min(0),
        price:Joi.number().min(0),
        category:Joi.string().required(),
        size:Joi.number(),
        metal:Joi.string(),
        productImg:Joi.string().default("Pandora-Logo-1982.png")

     })
    return productValidationSchema.validate(_product);
  }
