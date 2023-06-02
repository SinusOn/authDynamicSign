import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DBURL = process.env.DBURL;
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.static(`public`));
// app.use("/auth", router);
app.use("/", router);
app.get("/", (req, res) => {
  res.render(`index`);
});
async function startApp() {
  try {
    await mongoose.connect(DBURL);
    app.listen(PORT, () => console.log(`server started on ${PORT} port`));
  } catch (error) {
    console.log("error db");
  }
}
startApp();

// app.get("/clear", (req, res) => {
//   res.clearCookie("myTestcookie");
//   res.send("cleared");
// });
