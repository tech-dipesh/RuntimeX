import { Router, Request, Response } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/upload", async (req: Request, res: Response) => {
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
    return res.status(200).json({ "projectId":"demo-app", "type":"api-call", "payload":{ "url":"/jobs", "duration":120 }});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
