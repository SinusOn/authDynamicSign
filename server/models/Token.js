import mongoose, { Schema } from "mongoose";

let Token = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tokenSign: { type: String, required: true },
});

export default mongoose.model("Token", Token);
