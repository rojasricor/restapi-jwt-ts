import { Router } from "express";
const router: Router = Router();

import {
  profile,
  signin,
  signup,
  testing,
} from "../controllers/auth.controller";
import { verifyToken } from "../libs/verifyToken";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", verifyToken, profile);
router.get("/testing", verifyToken, testing);

export default router;
