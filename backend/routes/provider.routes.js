import express from 'express'
import { getAllProviders } from '../controllers/provider.controller.js'
import {getProviderById} from '../controllers/provider.controller.js'
import {updateProvider} from '../controllers/provider.controller.js'
import {createProvider} from '../controllers/provider.controller.js'
import {getProviderServices} from '../controllers/provider.controller.js'
import { deleteProvider } from '../controllers/provider.controller.js'

import protect from "../middlewares/auth.middlewares.js"
import authorizeRoles  from "../middlewares/role.middlewares.js";

const router = express.Router();

router.get('/', getAllProviders);
router.get('/:id',getProviderById);
router.post('/',protect, authorizeRoles("Admin"),createProvider);
router.put('/:id',protect, authorizeRoles("Admin"),updateProvider);
router.delete('/:id', protect, authorizeRoles("Admin"),deleteProvider)
router.get('/:id/services',protect, getProviderServices);

export default router;
