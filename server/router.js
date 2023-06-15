import { Router } from "express";
import authController from "./controllers/authController.js";
import auth from "./authMiddle.js";
import role from "./roleMiddle.js";
const router = new Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/comparesign", authController.compareSign);
router.post("/changepass", authController.changePass);

router.get("/users", role("Admin"), authController.users);
router.get("/refresh", authController.refresh);
export default router;
