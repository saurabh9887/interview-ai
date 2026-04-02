import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reportList, setReportList] = useState([]);

  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,
        report,
        setReport,
        reportList,
        setReportList,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
