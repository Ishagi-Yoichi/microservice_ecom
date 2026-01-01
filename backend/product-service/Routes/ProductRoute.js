import express from 'express';
import {
  CreateProduct,
  GetAllProduct,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
  DeductStock
} from '../Controllers/ProductController.js';

const router = express.Router();

router.post('/create', CreateProduct);
router.get('/', GetAllProduct);
router.get('/:id', GetProduct);
router.put('/:id/deduct', DeductStock);
router.put('/:id', UpdateProduct);
router.delete('/:id', DeleteProduct);

export default router;

