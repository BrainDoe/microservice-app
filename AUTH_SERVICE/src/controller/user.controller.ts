import { Request, Response } from "express";
// import {nanoid} from "nanoid";
import { v4 as uuidv4 } from 'uuid';
import {promises} from "fs";
import { User } from "../types/user.type";
import jwt from "jsonwebtoken"



// SIGN JWT REFRESH TOKEN
export const signAccessToken = (id: string, email: string): string => {
  return jwt.sign({id, email}, `${process.env.JWT_SECRET}`, {expiresIn: `${process.env.JWT_EXPIRATION}`});
}

export async function createUserHandler(req: Request, res: Response) {
  const {name, email, password} = req.body;

  try {
    if(!name || !email || !password) {
      return res.status(400).json({
        message: "Please fil in all fields"
      })
    }

    let newUser: User = {id: uuidv4(), name, email, password, active: true}
    const updateJSONfile = async() => {
      const jsonFile = await promises.readFile('src/user.json', 'utf8');
      let parsedData = JSON.parse(jsonFile);
      parsedData.push(newUser);
      return await promises.writeFile('src/user.json', JSON.stringify(parsedData, null, 2));
    }
    updateJSONfile();

    return res.status(201).send({
      status: "success",
      messaage: "User created successfully",
      data: newUser
    })
  } catch (error: any) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    })
  }
}


export async function getCurrentUserHandler(req: Request, res: Response) {
  const {email, password} = req.body
  if(!email || !password) return res.status(400).json({
    message: "Fill all fields"
  })

  try {
    const readJSONfile = async () => {
      const jsonFile = await promises.readFile('src/user.json', 'utf8');
      return JSON.parse(jsonFile);
    }
    const data = await readJSONfile();

    let result;
    let token;
    for (let item of data) {
      if(item.email === email && item.password === password) {
        result = item;
        token = signAccessToken(item.email, item.id)
      } 
    }

    return res.status(200).json({
      data: {...result, token}
    })

  } catch (error: any) {
    return res.status(500).json({
      status: "error", 
      message: "Could not login", 
      description: error.message
    })    
  }
}