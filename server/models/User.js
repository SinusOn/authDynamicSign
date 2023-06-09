import mongoose from "mongoose";

let User = new mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  // role: { type: String, ref: "Role" },
  role: { type: String, default: "User" },
});

export default mongoose.model("User", User);
