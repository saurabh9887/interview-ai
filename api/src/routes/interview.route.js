import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/file.middleware.js";
import { generateInterViewReportController } from "../controllers/interview.controller.js";

const router = express.Router();

router.post(
  "/generate-report",
  authUser,
  upload.single("resume"),
  generateInterViewReportController,
);

export default router;
