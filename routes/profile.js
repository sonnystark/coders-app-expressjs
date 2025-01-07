import express from "express";
const router = express.Router();
import {
  getCoderProfile,
  getManagerProfile,
  updateCoderProfile,
  updateManagerProfile,
} from "../controllers/profile.js";

router.get("/coder", getCoderProfile);
router.get("/manager", getManagerProfile);
router.put("/coder", updateCoderProfile);
router.put("/manager", updateManagerProfile);

export default router;
