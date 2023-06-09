import { Router } from "express";
import authController from "./controllers/authController.js";
import auth from "./authMiddle.js";
import role from "./roleMiddle.js";
const router = new Router();

router.post("/registration", authController.registration);
// router.get("/users", auth, authController.users);
router.get("/users", role("Admin"), authController.users);
// router.get("/user", auth, authController.user);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/comparesign", authController.compareSign);
router.get("/refresh", authController.refresh);
router.post("/changepass", authController.changePass);
router.get("/getrole", authController.getRole);

export default router;
// router.post("/coord", authController.postCoord);
