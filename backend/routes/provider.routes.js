import express from 'express'
import { getAllProviders } from '../controllers/provider.controller.js'
import {getProviderById} from '../controllers/provider.controller.js'
import {updateProvider} from '../controllers/provider.controller.js'
import {createProvider} from '../controllers/provider.controller.js'
import {getProviderServices} from '../controllers/provider.controller.js'
import { deleteProvider } from '../controllers/provider.controller.js'

const router = express.Router();

router.get('/', getAllProviders);
router.get('/:id',getProviderById);
router.post('/',createProvider);
router.put('/:id',updateProvider);
router.delete('/:id', deleteProvider)
router.get('/:id/services', getProviderServices);

export default router;
