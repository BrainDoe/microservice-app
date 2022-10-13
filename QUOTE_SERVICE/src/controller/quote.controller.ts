import { Request, Response } from "express";
import axios from "axios";
import amqp, { Channel, Connection} from "amqplib";


let connection: Connection, channel: Channel
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("QUOTE_SERVICE");
}
connect()

export async function getQuoteHandler(req: Request, res: Response) {
  try {
    const {data} = await axios.get("https://type.fit/api/quotes");
    if(!data) {
      return res.status(500).json({
        message: "Something went wrong."
      })
    }

    // Make random
    const randomQuote = data[Math.floor(Math.random() * (data.length))];

    // Send data to queue
    channel.sendToQueue("AUTH_SERVICE", Buffer.from(JSON.stringify(randomQuote)));

    return res.status(200).send({
      status: "success",
      messaage: "Random quote successfully generated",
      data: {
        quote: randomQuote?.text,
        author: randomQuote?.author
      }
    })
  } catch (error: any) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    })
  }
}