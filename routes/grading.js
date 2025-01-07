import express from "express";
const router = express.Router();
import { submitCode } from "../controllers/grading.js";

router.post("/submit", submitCode);

export default router;
