import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import authController from "./authController.js";
import User from "./models/User.js";
import Role from "./models/Role.js";

const app = express();
const PORT = 3000;
const DBURL = "mongodb://localhost:27017/AuthDB";
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(express.static(`public`));
app.use("/auth", router);
app.get("/", (req, res) => {
  res.render(`index`);
});
app.post(
  "/registration",
  jsonParser,
  authController.registration
  // const { name, login, password } = req.body;
  // let user = User.create({ name, login, password, role: "User" });
  // res.status(200).json("SAved user");
);
async function startApp() {
  try {
    await mongoose.connect(DBURL);
    app.listen(PORT, () => console.log(`server started on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
}
startApp();
