import express from "express";
import {
  getMeController,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-me", authUser, getMeController);

export default router;
