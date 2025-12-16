import { Product } from "../Models/ProductModel.js";

export async function CreateProduct(req,res){
    const {name, description, price, category, stock } = req.body;
    try{
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock
        })
        await newProduct.save()
        res.status(201).json(newProduct)
    }
    catch(err){
        res.status(500).send("Server error",err)
        console.log(err);
    }
}

export async function GetAllProduct(req,res){
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).send("Server error",err);
        console.log(err);
    }
}

export async function GetProduct(req,res){
    
    try{
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({msg:"Product not found"});
        res.status(200).json(product);
    } 
    catch(err){
        res.status(500).send("Server error",err)
    }
}

export async function UpdateProduct(req,res){
    const {name,description,price,category,stock} = req.body;
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {name,description,price,category,stock},
            {new: true}
        )
        if(!updatedProduct) 
            return res.status(404).json({msg:"Product not found"})
        res.status(200).json(updatedProduct);
    }
    catch(err){
        res.status(500).send("Server error",err);
    }
}

export async function DeleteProduct(req,res){
    try{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({msg:"Product not found"});
    res.status(200).json({msg:"Product Deleted"});
    }
    catch(err){
        res.status(500).send("server error",err);
    }
}