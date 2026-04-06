import axios from "axios";
import { Base_url } from "@/Base_Url/Base_url";
import api from "@/components/apiInstance";

export const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append("resume", resume[0]);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  try {
    const res = await api.post("/api/interview/generate-report", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewReportByID = async (interviewID) => {
  const res = await api.get(`/api/interview/get-single-report/${interviewID}`);
  return res.data;
};

export const getAllInterviewReports = async () => {
  const res = await api.get("/api/interview/get-list");
  return res.data;
};
