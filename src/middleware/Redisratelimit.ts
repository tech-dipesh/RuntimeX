
import express, { Request, Response, NextFunction } from 'express';
import redis from '../config/redis';

const RATE_LIMIT = Number(process.env.RATE_LIMIT || 50);
const RedisRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  let ip: string  | string []| undefined= req?.ip ?? req.headers['x-forwarded-for'];
  if (!ip || typeof ip!=='string')  {
    ip=req.socket.remoteAddress
  }
  const userKey=`limiter:${ip}`
  const checkExist = await redis.get(userKey);
  const convertToNumber: number = Number(checkExist);
  if (checkExist && convertToNumber >= RATE_LIMIT) {
    return res.status(429).json({
		success: false,
		message: "Rate Limiter Implemented",
		data:  "Rate Limit Reached Please Try Again After Certain Time",
		errros: checkExist,
    })
  }
  if (!checkExist) {
    await redis.set(userKey, 0, 'EX', 10);
  }
  else {
    await redis.incr(userKey)
  }
  next()
}

export default RedisRateLimiter;