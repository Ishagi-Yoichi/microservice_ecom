import { Order } from "../Models/OrderModel.js";
import mongoose from "mongoose";
import axios from 'axios';

const PRODUCT_SERVICE_URI = process.env.PRODUCT_SERVICE_URI || "http://localhost:3001"

export async function CreateOrder(req,res){
const {userId} = req.params;
const {items,totalAmount} = req.body;
try{
    // Check product availability
    const availabilityChecks = await Promise.all(
        items.map(async (item)=>{
            try {
                const product = await axios.get(`${PRODUCT_SERVICE_URI}/api/products/${item.productId}`)
                return product.data && product.data.stock >= item.quantity
            } catch (error) {
                console.error(`Error checking product ${item.productId}:`, error.message);
                return false;
            }
        })
    );

    const allAvailable = availabilityChecks.every(check => check === true);
    if(!allAvailable){
        return res.status(400).json({msg:"One or more items are out of stock :("})
    }

    //new order creation
    const order = new Order({
        userId,
        items,
        totalAmount
    });

    await order.save()

    //stock deduction
    await Promise.all(
        items.map(async (item)=>{
            await axios.put(
                `${PRODUCT_SERVICE_URI}/api/products/${item.productId}/deduct`,
                {
                    quantity: item.quantity,
                }
            )
        })
    )

    res.status(201).json(order)
}
catch(err){
    res.status(500).send("Server error order-service",err);
    console.log("Order Service error",err);
}
}

export async function GetAllOrder(req,res){
    try{
        const order = await Order.find();
        res.json(order);
    }
    catch(err){
        res.status(500).send("Server error");
        console.log("Order Service error",err);
    }
}

export async function UpdateOrder(req,res){
    const {orderId} = req.params;
    const {status} = req.body;

    try{
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({msg:"Order not found"});

        order.status = status;
        await order.save()

        res.json(order);
    }catch(err){
        res.status(500).send("Server error");
    }
}

export async function GetOrder(req,res){
    const {orderId} = req.params;
    try{
        const order = await Order.findById(orderId);
        if(!order) return res.status(404).json({msg:"Order not found"});
        res.json(order);
    }catch(err){
        res.status(500).send("Server error");
    }
}

export async function DeleteOrder(req,res){
    const {orderId} = req.params;
    try{
        const order = await Order.findByIdAndDelete(orderId);
        if(!order) return res.status(404).json({msg:"Order not found"});
        res.json(order);
    }catch(err){
        res.status(500).send("Server error");
        console.log("Order Service error",err);
    }
}