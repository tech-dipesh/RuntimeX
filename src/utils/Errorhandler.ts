import { Request, Response, NextFunction, RequestHandler } from 'express';
export default function Errorhandler(fn: RequestHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    // I Must make a Promise Method so even it's return a Noon Promise it'll Wrap within a function.
    // When we do non Promoise it can't catch all the error blug.
    // With send our Error on the next so it pass to the error middleware handler block
     Promise.resolve(fn(req, res, next)).catch(next);
    };
}
