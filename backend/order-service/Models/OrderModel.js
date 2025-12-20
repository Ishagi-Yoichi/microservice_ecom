import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: {type:String,required:true},
    quantity:{type:Number, required:true},
})

const orderSchema = new mongoose.Schema({
    userId:{type:String, rquired:true},
    items:[orderItemSchema],
    totalAmount:{type:Number,required:true},
    status:{type:String,default:"Pending"},
    creadetAt:{type:Date,default:Date.now},
})

export const Order = mongoose.model("Order",orderSchema)