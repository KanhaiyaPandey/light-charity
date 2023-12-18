import { Router } from "express";

import { DonorLogin, DonorRegister } from "../controllers/donorAuthControllers.js";

const router = Router();

router.post('/register',DonorRegister);
router.post("/login" , DonorLogin);


export default router;