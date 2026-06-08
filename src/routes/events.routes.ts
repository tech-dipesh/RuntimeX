import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import { batchSchema } from "../validations/events.validations";

const router = Router();
router.post("/events", async (req: Request, res: Response) => {
  const result = batchSchema.safeParse(req.body);
  console.log('success', result.success);
  if (!result.success) {
    res.status(400).json({
      error: "Invalid event data",
      // details: result?.error.errors,
      details: result?.error
    });
    return;
  }

  const eventsToCreate = result.data.map((event) => ({
    projectId: event.projectId,
    sessionId: event.sessionId,
    type: event.type,
    payload: event.payload,
    clientTs: new Date(event.timestamp),
    receivedAt: new Date(),
  }));

  try {
    // const batch = await prisma.rawEvent.createMany({
    //   data: eventsToCreate,
    // });
    // res.status(201).json({ ingested: batch.count });
  } catch (error) {
    console.error("Failed to insert events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/events/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // const events = await prisma.rawEvent.findMany({
    //   where: { sessionId: id },
    //   orderBy: { clientTs: "asc" },
    // });
    return res.json("test");
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
