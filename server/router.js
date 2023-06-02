import { Router } from "express";
import authController from "./controllers/authController.js";
import auth from "./authMiddle.js";

const router = new Router();

router.post("/registration", authController.registration);
router.get("/users", auth, authController.users);
router.get("/user", auth, authController.users);
router.post("login", authController.login);

export default router;
// router.post("/coord", authController.postCoord);

router.get("/refresh", authController.refresh);
