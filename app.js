import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import challengeRoutes from "./routes/challenges.js";
import gradingRoutes from "./routes/grading.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import statsRoutes from "./routes/stats.js";

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/challenges", challengeRoutes);
app.use("/grading", gradingRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/stats", statsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
