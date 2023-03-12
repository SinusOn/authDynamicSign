import { Router } from "express";

const router = new Router();

router.get("/user", (req, res) => {
  res.render("user");
});
export default router;
