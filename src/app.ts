import express, {Request, Response} from 'express';
import "dotenv/config";
import "./config/env"
import {prisma} from "@/lib/prisma";
import {AllAppRoutes} from "./types/types"
import EventsRoutes from "./routes/events.routes"
import ProjectsRoutes from "./routes/projects.routes"
import HealthRoutes from "./routes/health.routes"
import RedisRateLimiter from './middleware/Redisratelimit.middleware';
import { ErrorhandlerMiddleware } from './middleware/Errorhandler.middleware';
const app = express();
const port = Number(process.env.PORT || 3000);
app.set('trust proxy', true);
app.use(express.json({limit: '1mb'}));
app.use(RedisRateLimiter)
app.use(ErrorhandlerMiddleware)
app.get(AllAppRoutes.HOME, (_req: Request, res: Response) => {
  return res.status(200).json({
		success: true,
		message: "Success",
		data: "Success" ,
		errros: null,
  })
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
