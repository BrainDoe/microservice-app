import { Request, Response } from "express";
import axios from "axios";

export async function getQuoteHandler(req: Request, res: Response) {
  try {
    const {data} = await axios.get("https://type.fit/api/quotes");
    console.log(data)
    if(!data) {
      return res.status(500).json({
        message: "Something went wrong."
      })
    }

    const randomQuote = data[Math.floor(Math.random() * (data.length))];

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