import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

 export const userSchema = mongoose.Schema({
    // userId:String,
    userName:  String ,
    password:String,
    email:String,
    role:{type:String,default:"USER"},
    dateEnter:Date
})
export const generateToken = (_id, role, userName) => {

    let token = jwt.sign({ _id, userName, role }, process.env.SECRET_JWT, {
        expiresIn: "1h"
    });
    return token;

}
export const UserModel = mongoose.model("users", userSchema);
// export const userValidator = (_user) => {
//     const userValidationSchema = Joi.object().keys({
//         userName: Joi.string().min(3).max(12).required(),
//         password: Joi.string().min(0).length(8),
//         email:Joi.date().required(),
//         role:Joi.string(),
//         dateEnter:Joi.string()
//     })
//     return userValidationSchema.validate(_user);
//   }
