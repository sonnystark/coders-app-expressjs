import express from "express";
const router = express.Router();
import { getLeaderboard, getTopKCoders } from "../controllers/leaderboard.js";

router.get("/", getLeaderboard);
router.get("/top", getTopKCoders);

export default router;
