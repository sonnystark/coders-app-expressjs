import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  solution_rate: { type: Number, default: 0 },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Challenge", challengeSchema);
