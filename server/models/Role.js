import mongoose from "mongoose";

let Role = new mongoose.Schema({
  value: { type: String, unique: true, required: true, default: "User" },
});

export default mongoose.model("Role", Role);
