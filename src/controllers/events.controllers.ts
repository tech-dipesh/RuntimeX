import { Router, Request, Response } from "express";
import { Temporal } from '@js-temporal/polyfill';
import { Prisma } from "@generated/prisma/client";
import {prisma} from "@/lib/prisma";
import { batchSchema , } from "../validations/events.validations";
import { TYPE_ENUM } from "../types/events.types";

export const CreatenewEvents=async (req: Request, res: Response) => {
  const defaultUser: object = {
    user: "Default User",
    age: "Default Age: 99"
  }
  const eventsToCreate = req.body.map((event) => ({
    project_id: event.project_id ,
    session_id: event.session_id ,
    type: event.type || TYPE_ENUM.API_CALL,
    payload: event.payload as Prisma.InputJsonValue || defaultUser,
    // As the Prisma Yet Not Supported a `Temporal` api which i'm using as for now use a Default Date in build for suuport to the prisma
    // client_ts: Temporal.Now.instant(),
    client_ts: new Date(), 
    received_at: new Date(),
  }));
  const createList = await prisma.raw_event.createManyAndReturn({
    data: eventsToCreate,
  });
  return res.status(200).json({
    success: true,
    message: "Successfully Injected List of Data",
    data:  createList ,
    errors: null
  });
}
interface IParam{
  id: string
}
export const getIndivdualEvents=async (req: Request, res: Response) => {
  const { session_id: id } = req.params ?? {} as unknown as IParam;
    if (!id) {
      return res.status(400).json( {
        success: false,
        message: "You Forget to add a Id",
        data:  "Please Enter a UID" ,
        errors: "Id Invalidation"
      })
    }

    const events = await prisma.raw_event.findFirst({
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
    return res.status(200).json({
      success: true,
      message: events,
      data:  "All the Individuall CreatenewEvents",
      errros: false,
    })
  }


export const EntireWebsiteStats=async (req: Request, res: Response) => {
    const allEvent=await prisma.raw_event.count({}) 
    return res.status(200).json({
      success: true,
      message: "All the List of Event is",
      data:  allEvent,
      errros: null,
    })
  }