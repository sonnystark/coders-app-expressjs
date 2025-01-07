import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
});

export default mongoose.model("Challenge", challengeSchema);
