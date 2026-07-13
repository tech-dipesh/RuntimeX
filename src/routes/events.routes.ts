import { Router, Request, Response } from "express";
import { Temporal } from '@js-temporal/polyfill';
import { z } from "zod";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { batchSchema , } from "../validations/events.validations";
import { $ZodCheckLengthEquals } from "zod/v4/core";
import { TYPE_ENUM } from "../types/events.types";

const router = Router();
router.post("/events", async (req: Request, res: Response) => {
  const result = batchSchema.safeParse(req.body);
  // console.log(result.data);
  if (!result.success) {
    return res.status(400).json({
      "success": false,
      "message": "Invalid Data Please enter a data.",
      "data": { details: result?.error?.issues[0].message },
      "errors":  result.error.message
    })
  }
  const defaultUser: object = {
    user: "dip",
    age: "sharma"
  }
  try {
    const eventsToCreate = result.data.map((event) => ({
      project_id: event.project_id || '9d368e22-93f8-4f37-9d8a-2fad7b908433',
      session_id: event.session_id || 'ec94689b-6824-45ba-86f1-e3948943f074',
      type: event.type || TYPE_ENUM.API_CALL,
      payload: event.payload as Prisma.InputJsonValue || defaultUser,
      client_ts: Temporal.Now.instant(),
      received_at: new Date(),
    }));
    const createList = await prisma.raw_event.createMany({
      data: eventsToCreate,
    });
    console.log("list", createList);
    return res.status(200).json({
      success: true,
      message: "Successfully Injected List of Data",
      data: { details: createList },
      errors: null
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(500).json({
        success: false,
        message: "Zod Validation Error",
        data: error.message,
        errors: error.name
      });
    }
    else {
      return res.status(500).json({ message: error.message });
    }
  }
});

router.get("/events/:session_id", async (req: Request, res: Response) => {
const { session_id: id } = req.params ?? {};
try {
  if (!id) {
  return res.status(400).json( {
    success: false,
    message: "You Forget to add a Id",
    data: { message: "Please Enter a UID" },
      errors: "Id Invalidation"
    })
}

  const events = await prisma.raw_event.findMany({
    where: { session_id: id },
    orderBy: { client_ts: "asc" },
  });
  if (!events) {
    return res.status(400).json({
      success: false,
      data: {message: "Please Add a Correct Session Id"},
      errros: events
    })
  }
  return res.status(200).json({ message: events });
}
  catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(500).json({
        success: false,
        message: "Zod Validation Error",
        data: error.message,
        errors: error.name
      });
    }
    else {
      return res.status(500).json({
      success: false,
      message: "Logical Syntax Error Please check it",
      data: {message: error},
      errros: error,
      })
   }
  }
});
router.post('/stats', async (req: Request, res: Response) => {
	try {
		const allEvent=await prisma.raw_event.count({}) 
		return res.status(200).json({
  success: true,
  message: "All the List of Event is",
  data:  allEvent,
  errros: null,
  })
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error Occurred",
			data: error,
			errors: error
		});
	}
});
export default router;
