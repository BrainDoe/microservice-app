import express, { Application, Request, Response, NextFunction} from 'express';
import { Server } from 'http';
import { config } from 'dotenv';
import router from './routes/index.route'

config();

const app: Application = express();
app.use(express.json());

const port: number = Number(process.env.PORT || 8088);

app.get('/health-check', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use(router);

const server: Server = app.listen(port, (): void => console.log(`listening on http://localhost:${port}`));