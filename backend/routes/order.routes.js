import express from 'express';
import {getAllOrders} from '../controllers/order.controller.js'
import {getOrderById} from '../controllers/order.controller.js'
import {createOrder} from '../controllers/order.controller.js'
import {updateOrderStatus} from '../controllers/order.controller.js'
import {deleteOrder} from '../controllers/order.controller.js'
import {getOrderReview} from '../controllers/order.controller.js'

const router = express.Router();


router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);
router.get('/:id/review', getOrderReview);

export default router;
