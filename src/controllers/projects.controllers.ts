import { Request, Response } from "express";
import generateApiKey from "../utils/generateapikey";
import bcyrpt from "bcrypt"
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
  const { project_id, session_Id } = req.body ?? {};
  try {
    const val=generateApiKey()
    // const HashVAlue=bcrypt.
    return res.status(200).json({
      success: "hello",
      message: 'test',
      data: val,
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