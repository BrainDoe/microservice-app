import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );
  console.log(accessToken)

  if (!accessToken) {
    return res.status(403).send({
      message: "Unothorized"
    });
  }

  jwt.verify(accessToken, `${process.env.JWT_SECRET}`, (err: any, data: any) => {
    if(err) {
      res.status(401).json({ 
        message: err.message
      })
    }
    // @ts-ignore
    res.locals.user = data
  })

  return next();
};

export default deserializeUser;