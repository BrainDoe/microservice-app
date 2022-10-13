"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.post("/api/v1/users", user_controller_1.createUserHandler);
router.get("/api/v1/users/me", user_controller_1.getCurrentUserHandler);
exports.default = router;
