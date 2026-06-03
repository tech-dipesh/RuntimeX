import { Request, Response, NextFunction, Router } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { UnauthorizedError } from '../utils/errors';
import {z} from "zod"

import prisma from "../lib/prisma.js";
import { batchSchema } from "../validations/events.validations";
const router = Router();

router.post("/events", async (req: Request, res: Response) => {
  try {
    const validated = batchSchema.parse(req.body);
    const eventsToCreate = validated.map((event) => ({
      projectId: event.projectId,
      sessionId: event.sessionId,
      type: event.type,
      payload: event.payload,
      clientTs: new Date(event.timestamp),
      receivedAt: new Date(),
    }));

    const batch = await prisma.rawEvent.createMany({
      data: eventsToCreate,
    });

    res.status(201).json({ ingested: batch.count });
  } catch (error: unknown) {
    if (error instanceof Error){
    return res.status(500).json({ message: error.message });
    }
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid event data", details: error.errors });
    } else {

    }
  }
})
router.get(":id", async (req: Request, res: Response)=>{
 const { id } = req.params;
  try {
    const events = await prisma.rawEvent.findMany({
      where: { sessionId : id},
      orderBy: { clientTs: "asc" },
    });
    res.json(events);
  } catch (error: unknown) {
    if (error instanceof Error){
    return res.status(500).json({ message: error.message });
    }
    }
})

export default router;
