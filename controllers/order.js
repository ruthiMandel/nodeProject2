import mongoose from "mongoose";
import {OrderModel } from "../models/order.js"
import Joi from "joi";

//params חובה /api/course/1
//queryparams אופציונלים /api/course?txt=a




export const getAllOrders = async (req, res, next) => {

    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 30;

    // if(req.xxx)
    try {
        let allOrders = await OrderModel.find({}
            ).skip((page - 1) * perPage).limit(perPage);
        //pagination
        res.json(allOrders)

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get orders" })
    }
}



export const getOrderById = async (req, res) => {
    let { _id } = req.params;
    try {
        if (!mongoose.isValidObjectId(_id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
        // return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let order = await OrderModel.findById(_id);
        if (!order)
            return res.status(404).json({ type: "no id", message: "no course with such id" })
        return res.json(order)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}


export const deleteOrder = async (req, res) => {
    let { _id } = req.params;
    try {
        if (!mongoose.isValidObjectId(_id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let order = await OrderModel.findByIdAndDelete(_id);
        if (!order)
            return res.status(404).json({ type: "no order to delete", message: "no order with such id to delete" })

        return res.json(order)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }
}

export const addOrder = async (req, res) => {
    let {orderDate,orderAdres,orderDetails} = req.body;
    if (!orderAdres)
        return res.status(404).json({ type: "missing params", message: "missing details in body orderId or orderDate" })
    // const errors = orderValidator(req.body);
    // console.log(errors)
    try {
        // const sameOrder = await OrderModel.findOne({ orderAdres:orderAdres});
        // if (!sameOrder)
        //      return res.status(409).json({ type: "same details", message: "there is already same order" })
        let newOrder = new OrderModel({orderDate,orderAdres,orderDetails});
        await newOrder.save();
        return res.json(newOrder)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}

export const updateOrder = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let order = await OrderModel.findById(id);
        if (!order)
            return res.status(404).json({ type: "order not found", message: "no order with such id" })
        // let { name, numLessons, startDate, tags, speaker, price } = req.body;

        // course.name = name || course.name;
        // course.price = price || course.price;
        // course.speaker = speaker || course.speaker;
        // course.numLessons = numLessons || course.numLessons;
        // course.startDate = startDate || course.startDate;
        // course.tags = tags || course.tags;

        // await course.save();

        let updated = await OrderModel.findByIdAndUpdate({orderMade:true})
        return res.json(updated);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}