"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const index_route_1 = __importDefault(require("./routes/index.route"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = Number(process.env.PORT || 8088);
app.get('/health-check', (req, res) => {
    res.sendStatus(200);
});
app.use(index_route_1.default);
app.post('/api/user-service/user', (req, res) => {
});
const server = app.listen(port, () => console.log(`listening on http://localhost:${port}`));
