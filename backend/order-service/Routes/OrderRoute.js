import express from 'express';
import { Order } from '../Models/OrderModel';

const router = express.Router();

router.post("/:userId",CreateOrder);
router.get("/:userId",GetAllOrder);
router.get("/:userId/:orderId",GetOrder);
router.put("/:orderId/status",UpdateOrder);
router.delete("/:userId/:orderId",DeleteOrder);

export default router;
