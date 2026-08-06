import express, { Request, Response, NextFunction } from 'express';
import { z } from "zod";
export const ErrorhandlerMiddleware=(err: Error, req: Request, res: Response, _next: NextFunction)=> {
    if (err instanceof z.ZodError) {
      return res.status(500).json({
        success: false,
        message: "Zod Validation Error",
        data: err.message,
        errors: err.name
      });
    }
  const statuscode = 500;
  const message = "Unexpected Error Occured";
  return res.status(statuscode).json({
    success: false,
    message: "Gone the Last Error Error handler Middleware",
    data:  message,
    errros: err,
  })
}