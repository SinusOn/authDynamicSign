import { Router } from "express";
import authController from "./controllers/authController.js";
import auth from "./authMiddle.js";

const router = new Router();

router.post("/registration", authController.registration);
router.get("/users", auth, authController.users);
// router.post("login", authController.login);
router.post("/test", authController.test);

export default router;
// router.post("/coord", authController.postCoord);
