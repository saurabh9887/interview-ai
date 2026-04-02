// import { pdfParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.services.js";
import { interviewReportModel } from "../models/interviewReport.model.js";

import { PDFParse } from "pdf-parse";
// const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
// const interviewReportModel = require("../models/interviewReport.model")

export const generateInterViewReportController = async (req, res) => {
  try {
    const { selfDescription, jobDescription } = req.body;

    // ✅ Basic validation
    if (!jobDescription) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    if (!req.file && !selfDescription) {
      return res.status(400).json({
        message: "Either resume or selfDescription is required",
      });
    }

    let resumeText = "";

    // ✅ Only parse if file exists
    if (req.file) {
      try {
        const pdfData = await new PDFParse(
          Uint8Array.from(req.file.buffer),
        ).getText();

        resumeText = pdfData.text || "";
      } catch (err) {
        console.error("PDF parsing failed:", err);
        return res.status(400).json({
          message: "Invalid or corrupted PDF file",
        });
      }
    }

    // ✅ Call AI
    const interViewReportByAi = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    // ✅ Save to DB
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...interViewReportByAi,
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getInterviewReportByID = async (req, res) => {
  const { interviewID } = req.params;

  if (!interviewID)
    return res.status(400).json({ message: "interviewID is required" });

  const existingReport = await interviewReportModel.findById(interviewID);

  if (!existingReport)
    return res
      .status(400)
      .json({ message: "Report aginst the provided ID not found" });

  return res.status(200).json({
    message: "Report found against the provided ID",
    report: existingReport,
  });
};

export const getReportList = async (req, res) => {
  const interviewReports = await interviewReportModel
    .find({ user: req.user?.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
};
