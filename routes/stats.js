import express from "express";
const router = express.Router();
import {
  getSolvedStats,
  getTrendingCategories,
  getHeatmap,
} from "../controllers/stats.js";

router.get("/solved", getSolvedStats);
router.get("/trending", getTrendingCategories);
router.get("/heatmap", getHeatmap);

export default router;
