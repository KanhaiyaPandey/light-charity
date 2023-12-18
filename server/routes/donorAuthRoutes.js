import { Router } from "express";

import { DonorRegister } from "../controllers/donorAuthControllers.js";

const router = Router();

router.post('/register',DonorRegister);



export default router;