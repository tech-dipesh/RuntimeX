import { Router, Request, Response } from 'express';
import prisma from "../lib/prisma.js";

const router = Router();

router.post('/upload', async (req: Request, res: Response) => {
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

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
