import express from "express"
import userRoutes from './user.route'
import quoteRoutes from './quote.route'

const router = express.Router();

router.use(userRoutes);
router.use(quoteRoutes);

export default router;