import { Router } from "express"
import { CreateNewProjectApiKeys, getAllProjects } from "../controllers/projects.controllers";
import Errorhandler from "../utils/Errorhandler";

const router=Router()
router.get('/', Errorhandler(getAllProjects));

router.post('/create', Errorhandler(CreateNewProjectApiKeys));
export default router;
