import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

main().catch(err => console.log("MongoDB Connection error",err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is connected");
}

const ProductSchema = new mongoose.Schema({
    name : {type:String,required:true},
    stock: {type:Number,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,enum:['wood','metal','plastic','cloth'],default:'metal',required:true},
    createdAt:{type:Date,default:Date.now()},
    updateAt:{type:Date,default:Date.now()}
})

export const Product = mongoose.model('Product',ProductSchema);

