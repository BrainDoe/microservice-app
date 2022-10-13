import express, { Application, Request, Response, NextFunction} from 'express';
import { Server } from 'http';
import { config } from "dotenv";
import router from './routes/index.route'
// @ts-ignore
import deserializeUser from '../../src/middleware/auth.middleware';
// import amqp from "amqplib";

config();

const app: Application = express();
app.use(express.json());

// app.use(deserializeUser);

const port: number = Number(process.env.PORT || 8089);
let connection;
let channel: any;
// async function connect() {
//   const amqpServer = "amqp://localhost:5672";
//   connection = await amqp.connect(amqpServer);
//   channel = await connection.createChannel();
//   await channel.assertQueue("ORDER");
// }
// connect().then(() => {
//   channel.consume("AUTH_SERVICE", (data: any) => {
//       console.log("Consuming AUTH service");
//       const content = JSON.parse(data.content);
      
//       channel.ack(data);
//       channel.sendToQueue(
//           "PRODUCT",
//           Buffer.from(JSON.stringify({ content }))
//       );
//   });
// });

app.use(router);

const server: Server = app.listen(port, (): void => console.log(`listening on http://localhost:${port}`));