import { Router, Request, Response } from "express";
import { TYPE_ENUM } from "../types/events.types";
import { CreatenewEvents, EntireWebsiteStats, getIndivdualEvents } from "../controllers/events.controllers";
import Errorhandler from "../utils/Errorhandler";
import { batchSchema } from "../validations/events.validations";
import validate from "../middleware/validate.middleware";

const router = Router();

router.get('/stats', Errorhandler(EntireWebsiteStats));
router.post("/events", validate({body: batchSchema}), Errorhandler(CreatenewEvents));

router.get("/events/:session_id", Errorhandler(getIndivdualEvents));

export default router;
