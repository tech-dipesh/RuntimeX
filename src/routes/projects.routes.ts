import { Router } from "express"
import { CreateNewProjectApiKeys, getAllProjects } from "../controllers/projects.controllers";

const router=Router()
router.get('/', getAllProjects);

router.post('/create', CreateNewProjectApiKeys);
export default router;
