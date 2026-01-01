import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import orderRoutes from './Routes/OrderRoute.js';

const PORT = process.env.PORT || 3002;

dotenv.config();
const app =express();
app.use(express.json());

app.use("/api/orders",orderRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Order Service connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error-Order Service', err);
    })

app.listen(PORT, () => {
    console.log(`Order Service listening on port ${PORT}`);
})