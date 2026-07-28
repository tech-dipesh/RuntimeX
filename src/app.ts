import express, { Request, Response, NextFunction } from 'express';
import "dotenv/config";
import "./config/env"
import {prisma} from "./lib/prisma.js";
import {AllAppRoutes} from "./types/types"
import EventsRoutes from "./routes/events.routes"
import ProjectsRoutes from "./routes/projects.routes"
import HealthRoutes from "./routes/health.routes"
import { z } from "zod";
import RedisRateLimiter from './middleware/Redisratelimit';
const app = express();
const port = Number(process.env.PORT || 3000);

interface Error {
  statusCode?: number;
  message?: string
}
app.set('trust proxy', true);
app.use(express.json({limit: '1mb'}));
const ErrorhandlerMiddleware=(err: Error, req: Request, res: Response, _next: NextFunction)=> {
    if (err instanceof z.ZodError) {
      return res.status(500).json({
        success: false,
        message: "Zod Validation Error",
        data: err.message,
        errors: err.name
      });
    }
  const statuscode = 500;
  const message = "Unexpected Error Occured";
  return res.status(statuscode).json({
    success: false,
    message: "Gone the Last Error Error handler Middleware",
    data:  message,
    errros: err,
  })
}
app.use(RedisRateLimiter)
app.use(ErrorhandlerMiddleware)
app.get(AllAppRoutes.HOME, (_req: Request, res: Response) => {
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
