import express, { Request, Response, NextFunction } from 'express';
import "dotenv/config";
import {prisma} from "./lib/prisma.js";
import Redis from "ioredis"
import EventsRoutes from "./routes/events.routes"
import HealthRoutes from "./routes/health.routes"
const app = express();
const port = process.env.PORT || 3000;
const redis=new Redis()
interface Error {
  statusCode?: number;
  message?: string
}
const RedisRateLimiter = async (req: Request, res: Response, next: NextFunction)=>{
  console.log('req', req.headers);
  console.log("ip", req.socket.remoteAddress);
next()
}
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
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});  
app.use(HealthRoutes)
app.use('/api/v1', EventsRoutes)

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
