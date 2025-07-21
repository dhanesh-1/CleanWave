import express from 'express';
import {getAllServices} from '../controllers/service.controller.js'
import {getServiceById} from '../controllers/service.controller.js'
import {createService} from '../controllers/service.controller.js'
import {updateService} from '../controllers/service.controller.js'
import {deleteService} from '../controllers/service.controller.js'
import {getServiceReviews} from '../controllers/service.controller.js'

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.get('/:id/reviews', getServiceReviews);

export default router;
