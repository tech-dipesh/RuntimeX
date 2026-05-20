import express, { Request, Response } from 'express';
import "dotenv/config";
import prisma from "./lib/prisma.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});

app.post('/upload', async (req: Request, res: Response) => {
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
      include: { posts: true },
    });

    res.status(201).json({ message: "User and posts created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);  // ← Fixed: ${port}
});
