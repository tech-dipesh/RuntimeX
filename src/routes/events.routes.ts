import { Router, Request, Response } from "express";
import { TYPE_ENUM } from "../types/events.types";
import { CreatenewEvents, EntireWebsiteStats, getIndivdualEvents } from "../controllers/events.controllers";

const router = Router();
router.post("/events", CreatenewEvents);

router.get("/events/:session_id", getIndivdualEvents);

router.post('/stats', EntireWebsiteStats);
export default router;
