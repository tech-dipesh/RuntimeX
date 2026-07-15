import { getRuntime } from "@prisma/client/runtime/index-browser";
import { Router, Request, Response } from "express";

const router=Router()
router.get('/', async (req: Request, res: Response) => {
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
});
export default router;
