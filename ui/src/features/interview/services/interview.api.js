import axios from "axios";
import { Base_url } from "@/Base_Url/Base_url";

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
    const res = await axios.post(
      `${Base_url}/api/interview/generate-report`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewReportByID = async (interviewID) => {
  const res = await axios.get(
    `${Base_url}/api/interview/get-single-report/${interviewID}`,
    {
      withCredentials: "true",
    },
  );
  return res.data;
};

export const getAllInterviewReports = async () => {
  const res = await axios.get(`${Base_url}/api/interview/get-list`, {
    withCredentials: true,
  });
  return res.data;
};
