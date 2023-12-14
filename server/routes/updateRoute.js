import { Router } from "express";
import { createDonor, update } from "../controllers/updateControllers.js";



const router = Router();

router.patch('/inventory',update);
router.post('/create-donor',createDonor);


export default router;