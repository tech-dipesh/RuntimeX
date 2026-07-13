import { Router, Request, Response } from "express";
import { Temporal } from '@js-temporal/polyfill';
import { z } from "zod";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { batchSchema , singleEventSchema} from "../validations/events.validations";
import { $ZodCheckLengthEquals } from "zod/v4/core";

const router = Router();
router.post("/events", async (req: Request, res: Response) => {
  const result = batchSchema.safeParse(req.body);
  // console.log(result.data);
  if (!result.success) {
    console.log('fail');
  return  res.status(400).json({ error: "Invalid event data", details: result?.error?.issues[0].message, });
  }
  
  try {
    const eventsToCreate = result.data.map((event) => ({
      projectId: event.projectId,
      sessionId: event.sessionId,
      type: event.type,
      payload: event.payload as Prisma.InputJsonValue,
      clientTs: Temporal.Now.instant(),
      receivedAt: new Date(),
    }));
    const createList = await prisma.rawEvent.createMany({
      data: eventsToCreate,
    });
    console.log("list", createList);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log('err', error);
    return res.status(500).json({ message: error });
  }
});

router.get("/events/:id", async (req: Request, res: Response) => {
  const { id } = req.body ?? {};
  try {
    if (!id) {
      return res.status(400).json({ message: "Please enter a Id" });
    }
    const events = await prisma.rawEvent.findMany({
      where: { sessionId: id },
      orderBy: { clientTs: "asc" },
    });
    return res.status(200).json({ message: events });
  } catch (error) {}
  return res.status(200).json({ message: "reach to the id" });
});

export default router;
