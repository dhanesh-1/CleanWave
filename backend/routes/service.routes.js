import express from 'express';
import {getAllServices} from '../controllers/service.controller.js'
import {getServiceById} from '../controllers/service.controller.js'
import {createService} from '../controllers/service.controller.js'
import {updateService} from '../controllers/service.controller.js'
import {deleteService} from '../controllers/service.controller.js'
import {getServiceReviews} from '../controllers/service.controller.js'

import protect from '../middlewares/auth.middlewares.js'
import authorizeRoles from '../middlewares/role.middlewares.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', protect, authorizeRoles('Service'), createService);
router.put('/:id', protect, authorizeRoles('Service'), updateService);
router.delete('/:id', protect, authorizeRoles('Service'), deleteService);
router.get('/:id/reviews', getServiceReviews);

export default router;
