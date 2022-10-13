import express, { Request, Response } from "express"
import { createUserHandler, getCurrentUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post("/api/v1/users", createUserHandler);

router.post("/api/v1/users/login",  getCurrentUserHandler);


export default router;
