import express, { Application, Request, Response, NextFunction} from 'express';
import { Server } from 'http';
import { config } from "dotenv";
import router from './routes/index.route'
// @ts-ignore
import deserializeUser from '../../src/middleware/auth.middleware';


config();

const app: Application = express();
app.use(express.json());

app.use(deserializeUser);

const port: number = Number(process.env.PORT || 8089);


app.use(router);

const server: Server = app.listen(port, (): void => console.log(`listening on http://localhost:${port}`));