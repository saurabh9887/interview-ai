import express from "express";
import {
  forgotPassword,
  getMeController,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { verifyEmail } from "../EmailService/verifyEmail.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.get("/get-me", authUser, getMeController);

export default router;
