import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { signIn } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signIn",signIn);

export default router;