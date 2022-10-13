import { Request, Response } from "express";
import amqp, { Connection, Channel } from "amqplib"


export async function getQuoteHandler(req: Request, res: Response) {
  let connection: Connection, channel: Channel;

  try {
    async function connect() {
      const amqpServer = "amqp://localhost:5672";
      connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertQueue("AUTH_SERVICE");
    }

    let quote;
    connect().then(() => {
      channel.consume("QUOTE_SERVICE", (data: any) => {
        console.log("Consuming QUOTE service");
        quote = JSON.parse(data.content);
        channel.ack(data);
      });
    });

    return res.status(200).json({
      data: quote
    })
  } catch (error: any) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    })
  }
}