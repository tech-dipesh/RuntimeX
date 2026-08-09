import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function globalErrorHandler( err: Error, req: Request, res: Response, next: NextFunction ) {
  if (err instanceof ZodError) {
    const formatted = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      data: formatted,
      errors: formatted,
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
}