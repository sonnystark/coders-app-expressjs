import express from "express";
const router = express.Router();
import {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  getCategories,
} from "../controllers/challenges.js";
import { validateChallenge } from "../validators/challenges.js";

router.post("/", validateChallenge, createChallenge);
router.get("/", getAllChallenges);
router.get("/:id", getChallengeById);
router.get("/categories", getCategories);

export default router;
