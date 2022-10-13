import express from "express"
import userRoutes from './quotes.route'

const router = express.Router();

router.use(userRoutes);

export default router;