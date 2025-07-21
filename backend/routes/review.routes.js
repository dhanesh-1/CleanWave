import express from 'express';
import {getAllReviews} from '../controllers/review.controller.js'
import {getReviewById} from '../controllers/review.controller.js'
import {createReview} from '../controllers/review.controller.js'
import {updateReview} from '../controllers/review.controller.js'
import {deleteReview} from '../controllers/review.controller.js'

const router = express.Router();

import protect from "../middlewares/auth.middlewares.js"
import authorizeRoles  from "../middlewares/role.middlewares.js";

router.get('/', protect, getAllReviews);
router.get('/:id', protect, getReviewById);
router.post('/', protect, createReview);
router.put('/:id', protect,updateReview);
router.delete('/:id', protect,deleteReview);

export default  router;
