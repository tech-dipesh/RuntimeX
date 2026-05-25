import express, { Request, Response } from 'express';
import "dotenv/config";
import prisma from "./lib/prisma.js";
import EventsRoutes from "./routes/events.routes"
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});  
app.post('/api/v1', EventsRoutes)
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);  // ← Fixed: ${port}
});
