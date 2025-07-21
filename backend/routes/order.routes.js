import express from 'express';
import {getAllOrders} from '../controllers/order.controller.js'
import {getOrderById} from '../controllers/order.controller.js'
import {createOrder} from '../controllers/order.controller.js'
import {updateOrderStatus} from '../controllers/order.controller.js'
import {deleteOrder} from '../controllers/order.controller.js'
import {getOrderReview} from '../controllers/order.controller.js'

import protect from "../middlewares/auth.middlewares.js"
import authorizeRoles  from "../middlewares/role.middlewares.js";

const router = express.Router();


router.get('/', protect, authorizeRoles('Admin'),getAllOrders);
router.get('/:id',protect, getOrderById);
router.post('/',protect, createOrder);
router.put('/:id', protect, updateOrderStatus);
router.delete('/:id',protect, authorizeRoles('Admin'),deleteOrder);
router.get('/:id/review',protect, getOrderReview);

export default router;
