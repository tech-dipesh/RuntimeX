import { Request, Response } from "express";
import generateApiKey from "../utils/generateapikey";
import bcyrpt from "bcrypt"
import { prisma } from "@/lib/prisma";
export const getAllProjects=async (req: Request, res: Response) => {
  
  const {project_id, session_Id}=req.body
  try {
    return res.status(200).json({
      success: "hello",
      message: 'test',
      data:  "test",
      errros: false,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error Occurred",
      data: error,
      errors: error
    });
  }
}


export const CreateNewProjectApiKeys=async (req: Request, res: Response) => {
  const { project_id, session_Id, name } = req.body ?? {};
  try {
    const val=generateApiKey()
    const HashVAlue = await bcyrpt.hash(val, 12);
    return res.status(200).json({
      success: true,
      message: "Successfully Generate a New Api Keys, Please Store on Somewhere you can only create once",
      data: val,
      errros: false,
    })
    // const InsertOnDb = await prisma.project.create({
    //   data: { }
    // })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error Occurred",
      data: error,
      errors: error
    });
  }
}