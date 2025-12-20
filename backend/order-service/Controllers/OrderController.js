import { Order } from "../Models/OrderModel.js";
import mongoose from "mongoose";
import axios from 'axios';

const PRODUCT_SERVICE_URI = process.env.PRODUCT_SERVICE_URI || "http://localhost:5002"

export async function CreateOrder(req,res){
const {userId} = req.params;
const {items,totalAmount} = req.body;
try{
     const ProductAvailable =async () =>{
        items.map(async (item)=>{
            const product = await axios.get(`${PRODUCT_SERVICE_URI}/api/products/${item.productId}`)
            return product.data && product.data.stock >= item.quantity
        })
    }

    if(!ProductAvailable){
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

    }
}

export async function OrderStatus(req,res){
    const {orderId} = req.body;
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