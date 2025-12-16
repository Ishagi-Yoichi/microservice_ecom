import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './Routes/ProductRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/products', productRoutes);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Product Service connected to MongoDB');

    app.listen(port, () => {
      console.log(`Product service listening on port ${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection error-Product Service', err);
  }
}

start();