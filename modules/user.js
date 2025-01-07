import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["coder", "manager"], required: true },
});

export default mongoose.model("User", userSchema);
