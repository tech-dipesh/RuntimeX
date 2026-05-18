import express from "express"
import type {Events, EventResponse} from "../types/events.ts"
import prisma from "../config/db.ts"
const app=express.Routes();


// app.post
app.post("/events", async (req: Request, res: Response)=>){
 const {Event: Events}=req.body;
 const {id, type, payload}=Event;
const AllUser=await prisma.user.findMany({});
console.log(AllUser);

  try {
    const message={
  "projectId":"demo-app",
  "type":"api-call",
  "payload":{
    "url":"/jobs",
    "duration":120
}
    return res.status(200).json({message});
  } catch (error) {
return res.status(500).json({ message: error.message });
)}
export default app;
