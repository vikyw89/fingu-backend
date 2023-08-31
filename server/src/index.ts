console.time('express')
import "dotenv/config";
import { initRoutes } from "./telegramRoutes";
import { NextFunction, Request, Response } from "express";
import express from "express";
import { router } from "./expressRoutes";

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

app.use('/api',router)

app.use((req:Request, res:Response) => res.status(200).send());

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack)
    res.status(500).json('Something broke!')
  })
  
app.listen(port, () => console.log(`listening on port ${port}`));

console.timeEnd('express')