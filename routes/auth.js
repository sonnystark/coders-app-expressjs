import express from "express";
const router = express.Router();
import {
  registerCoder,
  registerManager,
  loginCoder,
  loginManager,
} from "../controllers/auth.js";
import { validateRegistration, validateLogin } from "../validators/auth.js";

router.post("/register/coder", validateRegistration, registerCoder);
router.post("/register/manager", validateRegistration, registerManager);
router.post("/login/coder", validateLogin, loginCoder);
router.post("/login/manager", validateLogin, loginManager);

export default router;
