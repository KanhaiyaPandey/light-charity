import { Router } from "express";
import { update } from "../controllers/updateControllers.js";


const router = Router();

router.patch('/inventory',update);


export default router;