import { Router } from "express";
import authController from "./controllers/authController.js";
import auth from "./authMiddle.js";

const router = new Router();

router.post("/registration", authController.registration);
router.get("/users", auth, authController.users);
router.get("/user", auth, authController.user);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
// router.post("/coord", authController.postCoord);

router.get("/refresh", authController.refresh);
