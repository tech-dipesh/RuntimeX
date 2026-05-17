import express, {Request, Response} from 'express';
import "dotenv/config"
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
console.log("Respone:", Response);
  console.log("This is the First Routes Let's See");
  res.status(200).json({ message: 'Success' });
});

app.listen(port, () => {
  console.log(`App is listening on port port`);
});
