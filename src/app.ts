import express, { Request, Response } from 'express';
import "dotenv/config";
import {prisma} from "./lib/prisma.js";
import EventsRoutes from "./routes/events.routes"
import HealthRoutes from "./routes/health.routes"
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
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
