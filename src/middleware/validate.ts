import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

interface SchemaValidation {
  params?: ZodSchema;
  query?: ZodSchema;
  body?: ZodSchema;
}


export default function validate(schema: SchemaValidation) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema.params) {
      req.params = schema.params.parse(req.params);
    }
    if (schema.query) {
      req.query = schema.query.parse(req.query));
    }
    if (schema.body) {
      req.body=schema.bbody.parse(req.body)
    }
    next()
  }
}