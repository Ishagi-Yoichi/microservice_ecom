import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

main().catch(err => console.log("MongoDB Connection error",err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is connected");
}

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:['admin','user'],default:'user'},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});

export const User = mongoose.model('User',userSchema);
