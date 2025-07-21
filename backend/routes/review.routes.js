import express from 'express';
import {getAllReviews} from '../controllers/review.controller.js'
import {getReviewById} from '../controllers/review.controller.js'
import {createReview} from '../controllers/review.controller.js'
import {updateReview} from '../controllers/review.controller.js'
import {deleteReview} from '../controllers/review.controller.js'

const router = express.Router();



router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default  router;
