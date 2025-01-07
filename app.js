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
