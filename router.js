import { Router } from "express";
import authController from "./authController.js";
import auth from "./authMiddle.js";

const router = new Router();

router.post("/registration", authController.registration);
router.get("/users", auth, authController.users);

export default router;
// router.post("/coord", authController.postCoord);
