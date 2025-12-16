import { User } from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            res.status(400).json({message:'All fields are required'});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({name,email,password:hashedPassword});
        res.status(201).json({message:'User created successfully',user:newUser});
        await newUser.save();

    }


    catch(error){
        res.status(500).json({message:error.message});
        console.log('Signup failed',error);
    }
}

export async function login(req,res){
    try{
        const {email,password} = req.body;
        const user=await User.findOne({email});

        if(!user){
            res.status(404).json({message:'User not found'});
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match) return res.status(401).json({message:'Invalid credentials'});

        const token = jwt.sign({email: user.email},JWT_SECRET,{expiresIn:"1h"});
        return res.json({message:"Login successfull",token})

    }

    catch(error){
        res.status(500).json({message:error.message});
        console.log('Login failed',error);
    }
}