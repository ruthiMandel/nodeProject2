import Joi from "joi";
import mongoose from 'mongoose'
export const minimalUser = mongoose.Schema({
  // userId:Number,
  userName:String,
  email:String
})
 export const orderSchema = mongoose.Schema({
    orderDate:Date,
    getorderDate:Date,
    orderAdres:String,
    orderDetails:minimalUser,
    // arrProducts:productSchema,
    orderMade:Boolean
})
export const OrderModel = mongoose.model("orders", orderSchema);
export const orderValidator = (_order) => {
  const orderValidationSchema = Joi.object().keys({
      orderAdres: Joi.string().min(3).max(12).required(),
      getorderDate:Joi.date(),
      orderDate: Joi.date(),
      ordererDetails:Joi.isSchema(),
      userName:Joi.string().min(3),
      orderMade:Joi.boolean()
    })
  return orderValidationSchema.validate(_order);
}