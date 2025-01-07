import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  challenge_id: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  lang: { type: String, enum: ["py", "js"] },
  code: { type: String },
  status: {
    type: String,
    enum: ["Waiting", "Attempted", "Completed"],
    default: "Waiting",
  },
  score: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Submission", submissionSchema);
