import express from "express";
const router = express.Router();
import {
  registerCoder,
  registerManager,
  loginCoder,
  loginManager,
} from "../controllers/auth.js";
import { validateRegistration, validateLogin } from "../validators/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modules/user.js";
import { transporter } from "../app.js";

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const verificationLink = `http://localhost:3000/auth/verify?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Verify Your Account",
    text: `Click here to verify: ${verificationLink}`,
  });

  res
    .status(201)
    .json({ message: "User registered, check your email for verification" });
});

router.get("/verify", async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { is_verified: true });
    res.send("<h1>Email Verified Successfully!</h1>");
  } catch (err) {
    res.status(400).send("<h1>Invalid or Expired Token</h1>");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  if (!user.is_verified) {
    return res.status(400).json({ message: "Account not verified" });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

router.post("/register/coder", validateRegistration, registerCoder);
router.post("/register/manager", validateRegistration, registerManager);
router.post("/login/coder", validateLogin, loginCoder);
router.post("/login/manager", validateLogin, loginManager);

export default router;
