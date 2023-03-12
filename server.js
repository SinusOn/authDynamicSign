import express from "express";
import mongoose from "mongoose";
import router from "./router.js";

const app = express();
const PORT = 3000;
const DBURL = "mongodb://localhost:27017";
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(express.static(`public`));
app.use("/auth", router);
app.get("/", (req, res) => {
  res.render(`index`);
});
app.post("/registration", jsonParser, (req, res) => {
  console.log(req.body);
  if (!req.body) return res.sendStatus(400);
  res.sendStatus(200);
});
async function startApp() {
  try {
    await mongoose.connect(DBURL);
    app.listen(PORT, () => console.log(`server started on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
}
startApp();
