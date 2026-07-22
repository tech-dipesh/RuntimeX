import { Router, Request, Response } from "express";
import { TYPE_ENUM } from "../types/events.types";
import { CreatenewEvents, EntireWebsiteStats, getIndivdualEvents } from "../controllers/events.controllers";
import Errorhandler from "../utils/Errorhandler";

const router = Router();
router.post("/events", Errorhandler(CreatenewEvents));

router.get("/events/:session_id", Errorhandler(getIndivdualEvents));

router.post('/stats', Errorhandler(EntireWebsiteStats));
export default router;
