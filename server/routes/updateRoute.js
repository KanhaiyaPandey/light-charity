import { Router } from "express";
import { createDonor, update, getDonors } from "../controllers/updateControllers.js";



const router = Router();

router.patch('/inventory',update);
router.post('/create-donor',createDonor);
router.get('/donors', getDonors);


export default router;