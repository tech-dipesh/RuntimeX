import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ZodError, ZodSchema } from "zod";

export interface SchemaValidation<
  P extends z.ZodTypeAny = z.ZodTypeAny,
  Q extends z.ZodTypeAny = z.ZodTypeAny,
  B extends z.ZodTypeAny = z.ZodTypeAny
> {
  params?: P;
  query?: Q;
  body?: B;
}

export default function validate<
  P extends z.ZodTypeAny,
  Q extends z.ZodTypeAny,
  B extends z.ZodTypeAny
>(schema: SchemaValidation<P, Q, B>) {
  return (
    req: Request<z.infer<P>, Record<string, unknown>, z.infer<B>, z.infer<Q>>,
    res: Response,
    next: NextFunction
  ) => {
    if (schema.params) {
      req.params = schema.params.parse(req.params);
    }
    if (schema.query) {
      req.query = schema.query.parse(req.query);
    }
    if (schema.body) {
      req.body = schema.body.parse(req.body);
    }
    next();
  };
}