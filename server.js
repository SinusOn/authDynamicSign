import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const DBURL = "mongodb://localhost:27017/AuthDB";

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static(`public`));
app.use("/auth", router);
app.get("/", (req, res) => {
  res.render(`index`);
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
