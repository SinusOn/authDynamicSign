import mongoose from "mongoose";

let DTW = new mongoose.Schema({
  coordinates: { type: Array, required: true },
});

export default mongoose.model("DTW", DTW);
