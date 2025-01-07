import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["coder", "manager"], required: true },
  is_verified: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  solved_challenges: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
