import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/file.middleware.js";
import {
  generateInterViewReportController,
  getInterviewReportByID,
  getReportList,
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post(
  "/generate-report",
  authUser,
  upload.single("resume"),
  generateInterViewReportController,
);

router.get("/get-single-report/:interviewID", authUser, getInterviewReportByID);
router.get("/get-list", authUser, getReportList);

export default router;
