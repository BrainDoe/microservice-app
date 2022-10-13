import express, { Request, Response } from "express"
import { getQuoteHandler } from '../controller/quote.controller';

const router = express.Router();

router.get("/api/v1/quotes",  getQuoteHandler);


export default router;