import { Router } from "express";
import authController from "./authController.js";

const router = new Router();

router.post("/registration", authController.registration);
export default router;
