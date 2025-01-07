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
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
  const User = require("./modules/user.js");
  const Challenge = require("./modules/challenge.js");

  // DUMMY USER
  await User.create({
    username: "coder1",
    email: "coder1@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "coder",
    is_verified: false,
  });
  await User.create({
    username: "manager1",
    email: "manager1@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "manager",
    is_verified: false,
  });

  // DUMMY CHALLENGE
  await Challenge.create({
    title: "factorial",
    category: "Math",
    description: "Compute the factorial of a non-negative integer.",
    level: "Hard",
  });

  console.log("Dummy data added");
}

// Dummy data seeding
async function seedDatabase() {
  const User = require("./models/User");
  const Challenge = require("./models/Challenge");

  await User.create({
    username: "coder1",
    email: "coder1@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "coder",
    is_verified: false,
  });
  await User.create({
    username: "manager1",
    email: "manager1@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "manager",
    is_verified: false,
  });
  await Challenge.create({
    title: "factorial",
    category: "Math",
    description: "Compute the factorial.",
    level: "Hard",
  });

  console.log("Dummy data added");
}

async function seedTestDatabase() {
  const User = require("./models/User");
  const Challenge = require("./models/Challenge");
  const Submission = require("./models/Submission");

  const coder = await User.create({
    username: "testcoder",
    email: "testcoder@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "coder",
    is_verified: true,
  });
  const manager = await User.create({
    username: "testmanager",
    email: "testmanager@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "manager",
    is_verified: true,
  });

  const challenge1 = await Challenge.create({
    title: "test1",
    category: "Math",
    description: "Test challenge 1",
    level: "Easy",
    created_by: manager._id,
  });
  const challenge2 = await Challenge.create({
    title: "test2",
    category: "Math",
    description: "Test challenge 2",
    level: "Medium",
    created_by: manager._id,
  });

  await Submission.create({
    user_id: coder._id,
    challenge_id: challenge1._id,
    status: "Completed",
    score: 100,
  });
  await Submission.create({
    user_id: coder._id,
    challenge_id: challenge2._id,
    status: "Attempted",
    score: 50,
  });

  console.log("Test data added");
}

// Authentication Middleware
function authorize(roles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

// Email Transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
