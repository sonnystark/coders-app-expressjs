import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import challengeRoutes from "./routes/challenges.js";
import gradingRoutes from "./routes/grading.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import statsRoutes from "./routes/stats.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    seedDatabase();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedDatabase() {
  const User = require("./models/User");
  const Challenge = require("./models/Challenge");

  // Add dummy users
  await User.create({
    username: "coder1",
    password: "password123",
    role: "coder",
  });
  await User.create({
    username: "manager1",
    password: "password123",
    role: "manager",
  });

  // Add dummy challenge
  await Challenge.create({
    title: "factorial",
    category: "Math",
    description: "Compute the factorial of a non-negative integer.",
    level: "Hard",
  });

  console.log("Dummy data added");
}

// ROUTES
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/challenges", challengeRoutes);
app.use("/grading", gradingRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/stats", statsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
