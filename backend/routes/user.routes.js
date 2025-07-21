import express from "express"
import { getAllUsers } from "../controllers/user.controllers.js"
import { getUserById } from "../controllers/user.controllers.js"
import { createUser } from "../controllers/user.controllers.js"
import { updateUser } from "../controllers/user.controllers.js"
import { deleteUser } from "../controllers/user.controllers.js"
import { getUserOrders } from "../controllers/user.controllers.js"
import { getUserReviews } from "../controllers/user.controllers.js"

import protect from "../middlewares/auth.middlewares.js"
import authorizeRoles from "../middlewares/role.middlewares.js"

const router = express.Router();

router.get('/',protect, authorizeRoles('Admin'),getAllUsers);
router.get('/:id',protect, getUserById);
router.post('/',protect, authorizeRoles('Admin'),createUser);
router.put('/:id',protect,updateUser);
router.delete('/:id',protect,deleteUser)
router.get('/:id/orders',getUserOrders);
router.get('/:id/reviews',getUserReviews);

export default router;