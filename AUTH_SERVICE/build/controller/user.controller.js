"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserHandler = exports.createUserHandler = void 0;
const nanoid_1 = __importDefault(require("nanoid"));
const fs_1 = __importDefault(require("fs"));
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "Please fil in all fields"
                });
            }
            const newUser = { id: (0, nanoid_1.default)(), name, email, password };
            const user = fs_1.default.writeFile("user.json", JSON.stringify(newUser), (err) => {
                if (err)
                    throw err;
            });
            console.log(user);
            if (!user) {
                return res.status(400).json({
                    message: "Could not create user"
                });
            }
            return res.status(201).send({
                status: "success",
                messaage: "User created successfully"
            });
        }
        catch (error) {
            return res.status(500).send({
                status: "error",
                message: error.message,
            });
        }
    });
}
exports.createUserHandler = createUserHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(200).send({
            status: 'Success',
            data: res.locals.user
        });
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
