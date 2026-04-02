import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportByID,
} from "../services/interview.api";
import { useNavigate } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error(
      "useInterview must be used within an InterviewContextProvider",
    );
  }

  const { loading, setLoading, report, setReport, reportList, setReportList } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resume,
  }) => {
    setLoading(true);

    try {
      const res = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume,
      });

      if (res) {
        setLoading(false);
        setReport(res.interviewReport);
        navigate(`/interview/${res.interviewReport._id}`);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getReportByID = async (reportID) => {
    setLoading(true);

    try {
      const res = await getInterviewReportByID(reportID);
      if (res) {
        setLoading(false);
        setReport(res.report);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getReportList = async () => {
    setLoading(true);

    try {
      const res = await getAllInterviewReports();
      if (res) {
        setLoading(false);
        setReportList(res.interviewReports);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return {
    getReportByID,
    getReportList,
    generateReport,
    loading,
    report,
    reportList,
  };
};
