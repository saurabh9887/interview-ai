import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";

const reports = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Startup",
    score: 82,
    date: "Mar 20, 2026",
  },
  {
    id: 2,
    role: "React Developer",
    company: "Product Company",
    score: 75,
    date: "Mar 18, 2026",
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "SaaS Company",
    score: 88,
    date: "Mar 15, 2026",
  },
];

export default function ReportsPage() {
  const { getReportList, reportList } = useInterview();
  const navigate = useNavigate();
  useEffect(() => {
    getReportList();
  }, []);
  console.log(reportList);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Reports</h1>
          <p className="text-gray-500">
            Track and revisit your previous interview analyses
          </p>
        </div>
        <Link to="/generate-report">
          <Button className="cursor-pointer">New Analysis</Button>
        </Link>
      </div>

      {/* Reports List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportList?.map((report) => (
          <Card
            key={report._id}
            className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/interview/${report._id}`)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Match Score</span>
                <Badge>{report.matchScore}%</Badge>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{report.createdAt.split("T")[0]}</span>
                <span>View</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {reportList?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-xl font-semibold mb-2">No reports yet</h2>
          <p className="text-gray-500 mb-4">
            Generate your first interview analysis to get started
          </p>
          <Button>Create Report</Button>
        </div>
      )}
    </div>
  );
}
