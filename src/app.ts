import express, {Request, Response} from 'express';
import {Client} from "pg"
import "dotenv/config"
import prisma from "./lib/prisma.js"
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  console.log("Respone:", Response);
  console.log("This is the First Routes Let's See");
  res.status(200).json({ message: 'Success' });
});

app.post('/upload',async (req:Request, res:Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@prisma.io",
        posts: {
          create: {
            title: "Hello World",
            content: "This is my first post!",
            published: true,
          },
        },
      },
      include: {
        posts: true,
      },
    });
    console.log("Created user:", user);

    // Fetch all users with their posts
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    console.log("All users:", JSON.stringify(allUsers, null, 2));

  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

  app.listen(port, () => {
    console.log(`App is listening on port port`);
  });
