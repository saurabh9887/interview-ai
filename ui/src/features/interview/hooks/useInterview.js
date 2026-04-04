import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportByID,
} from "../services/interview.api";
import { useNavigate } from "react-router";
import { LoaderContext } from "@/components/LoaderContext";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const navigate = useNavigate();
  const { setSpinner } = useContext(LoaderContext);

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
    setSpinner(true);

    try {
      const res = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume,
      });

      if (res) {
        setSpinner(false);
        setReport(res.interviewReport);
        navigate(`/interview/${res.interviewReport._id}`);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  const getReportByID = async (reportID) => {
    setSpinner(true);

    try {
      const res = await getInterviewReportByID(reportID);
      if (res) {
        setSpinner(false);
        setReport(res.report);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  const getReportList = async () => {
    setSpinner(true);

    try {
      const res = await getAllInterviewReports();
      if (res) {
        setSpinner(false);
        setReportList(res.interviewReports);
      }
    } catch (error) {
      setSpinner(false);
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
