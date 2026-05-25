import { Router, Request, Response } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/events", async (req: Request, res: Response) => {
  const {value}=req.body;

  try {
    return res.status(201).json({ message: "hello" });
  } catch (error) {
    
  }
})
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { UnauthorizedError } from '../utils/errors';
import { prisma } from '../config/database';
export default router;
