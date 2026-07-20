import express, { Request, Response, NextFunction } from 'express';
import "dotenv/config";
import DotEnvConfig from "./config/env"
import {prisma} from "./lib/prisma.js";
import {AllAppRoutes} from "./types/types"
import Redis from "ioredis"
import EventsRoutes from "./routes/events.routes"
import ProjectsRoutes from "./routes/projects.routes"
import HealthRoutes from "./routes/health.routes"
import asyncHandler from './services/asyncHandler';
const app = express();
const port = Number(process.env.PORT || 3000);
const RATE_LIMIT = Number(process.env.RATE_LIMIT || 50);
const redis=new Redis()

interface Error {
  statusCode?: number;
  message?: string
}
const RedisRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  let ip: string  | string []| undefined= req?.ip ?? req.headers['x-forwarded-for'];
  if (!ip || typeof ip!=='string')  {
    ip=req.socket.remoteAddress
  }
  const userKey=`limiter:${ip}`
  const checkExist = await redis.get(userKey);
  const convertToNumber: number = Number(checkExist);
  if (checkExist && convertToNumber >= RATE_LIMIT) {
    return res.status(429).json({
		success: false,
		message: "Rate Limiter Implemented",
		data:  "Rate Limit Reached Please Try Again After Certain Time",
		errros: checkExist,
    })
  }
  if (!checkExist) {
    await redis.set(userKey, 0, 'EX', 10);
  }
  else {
    await redis.incr(userKey)
  }
  next()
}

app.set('trust proxy', true);
app.use(express.json({limit: '1mb'}));
const ErrorhandlerMiddleware=(err: Error, req: Request, res: Response, next: NextFunction)=> {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Unexpected Error Occured";
  return res.status(statuscode).json({
    success: false,
    message: "Gone the Last Error ErrorhandlerMiddleware",
    data:  message,
    errros: err,
  })
}
app.use(RedisRateLimiter)
app.use(ErrorhandlerMiddleware)

app.use( async (req: Request, res: Response, next: NextFunction) => {
  try {
    next()	
  } catch (error) {
    next(error)
  }
});
app.get(AllAppRoutes.HOME, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});  
app.use(AllAppRoutes.HEALTH, HealthRoutes)
app.use(AllAppRoutes.EVENTS, EventsRoutes)
app.use(AllAppRoutes.PROJECTS, ProjectsRoutes)

const ConnectDBAndServer=async()=>{
  try {
    await prisma.$connect();
    console.log("Db is connected"); 
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`); 
    })
  } catch (error) {
    console.log("error occured while db", error); 
  }
}
ConnectDBAndServer()
