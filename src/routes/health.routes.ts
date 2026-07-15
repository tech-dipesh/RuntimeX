import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";

const router=Router()

router.get("/", async (req: Request, res: Response) => {
  try {
    const exist = await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
    success: true,
    message: "Database is up",
    data:  exist,
    errros: null,
    }) 
  }
  catch (err) {
    return res.status(500).json({
    success: false,
    message: "The Database is down",
    data: {message: err},
    errros: err,
    }) 
  }
})
export default router;