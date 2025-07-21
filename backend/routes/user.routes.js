import express from "express"
import { getAllUsers } from "../controllers/user.controllers.js"
import { getUserById } from "../controllers/user.controllers.js"
import { createUser } from "../controllers/user.controllers.js"
import { updateUser } from "../controllers/user.controllers.js"
import { deleteUser } from "../controllers/user.controllers.js"
import { getUserOrders } from "../controllers/user.controllers.js"
import { getUserReviews } from "../controllers/user.controllers.js"

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id',getUserById);
router.post('/',createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser)
router.get('/:id/orders',getUserOrders);
router.get('/:id/reviews',getUserReviews);

export default router;