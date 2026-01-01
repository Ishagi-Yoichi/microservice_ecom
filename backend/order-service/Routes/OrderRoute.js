import express from 'express';
import { Order } from '../Models/OrderModel.js';
import { CreateOrder, GetAllOrder, GetOrder, UpdateOrder,DeleteOrder } from '../Controllers/OrderController.js';

const router = express.Router();

router.post("/:userId",CreateOrder);
router.get("/:userId",GetAllOrder);
router.get("/:userId/:orderId",GetOrder);
router.put("/:orderId/status",UpdateOrder);
router.delete("/:userId/:orderId",DeleteOrder);

export default router;
