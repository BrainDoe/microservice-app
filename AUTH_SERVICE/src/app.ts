import express, { Application, Request, Response, NextFunction} from 'express';
import { Server } from 'http';
import { config } from 'dotenv';
import router from './routes/index.route'
import amqp from "amqplib";

config();

const app: Application = express();
app.use(express.json());

const port: number = Number(process.env.PORT || 8088);

app.get('/health-check', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use(router);

let connection;
let channel: any;

// async function connect() {
//   const amqpServer = "amqp://localhost:5672";
//   connection = await amqp.connect(amqpServer);
//   channel = await connection.createChannel();
//   await channel.assertQueue("ORDER");
// }
// connect().then(() => {
//   channel.consume("QUOTES", (data: any) => {
//       console.log("Consuming QUOTES service");
//       const resource = JSON.parse(data.content);
//       channel.ack(data);
//   });
// });

const server: Server = app.listen(port, (): void => console.log(`listening on http://localhost:${port}`));