import { Request, Response } from "express";
import generateApiKey from "../utils/generateapikey";
import bcyrpt from "bcrypt"
import { prisma } from "@/lib/prisma";
export const getAllProjects=async (req: Request, res: Response) => {
  const {project_id, session_Id}=req.body
  const AllList = await prisma.project.findMany({
    where: {sessions: session_Id } 
  })
  return res.status(200).json({
    success: true,
    message: "Successfully Generated All the Projects.",
    data: AllList,
    errros: false,
  })
}


export const CreateNewProjectApiKeys=async (req: Request, res: Response) => {
  const { project_id, session_Id, name } = req.body ?? {};
  const val=generateApiKey()
  const HashVAlue = await bcyrpt.hash(val, 12);
  const InsertOnDb = await prisma.project.create({
    data: {name }
  })
  
  return res.status(200).json({
    success: true,
    message: "Successfully Generate a New Api Keys, Please Store on Somewhere you can only create once",
    data: val,
    errros: false,
  })
}