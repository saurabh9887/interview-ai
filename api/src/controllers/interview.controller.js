// import { pdfParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.services.js";
import { interviewReportModel } from "../models/interviewReport.model.js";

import { PDFParse } from "pdf-parse";
// const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
// const interviewReportModel = require("../models/interviewReport.model")

export const generateInterViewReportController = async (req, res) => {
  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  console.log("resumeContent.text", resumeContent.text);

  const interViewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  console.log("interViewReportByAi", interViewReportByAi);

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interViewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  });
};
