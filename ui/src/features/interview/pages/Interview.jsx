import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useLocation, useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

const DummyPlan = {
  id: "69c3ff31f082fc5cc54ceaa9",
  title: "Full Stack Developer Analysis - Arjun Mehta for TechNova Solutions",
  jobDescription:
    "Role: Full Stack Developer (React + Node.js)\nCompany: TechNova Solutions\nLocation: Remote / Pune\nResponsibilities\nBuild and maintain scalable web applications\nDevelop frontend using React.js and backend using Node.js\nDesign and consume REST APIs\nOptimize applications for performance and scalability\nCollaborate with cross-functional teams\nRequirements\n1–3 years of experience in MERN stack\nStrong understanding of JavaScript fundamentals\nExperience with databases like MongoDB or MySQL\nFamiliarity with Git and version control\nBasic understanding of system design\nGood to Have\nExperience with Docker\nKnowledge of Redis or caching\nExposure to cloud platforms (AWS, GCP)\nSalary Range\n₹5 LPA – ₹10 LPA",

  candidate: {
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 9876543210",
    location: "Pune, India",
  },

  summary:
    "I’m a software engineer who focuses more on solving real problems than just writing code. I prefer building things end-to-end so I understand both frontend and backend trade-offs. I’m not the smartest in the room, but I compensate by being consistent and shipping projects instead of overthinking. Right now, I’m focused on improving system design and building products that people actually use.",

  matchScore: 80,

  technicalQuestions: [
    {
      question: "How did you implement JWT and role-based access control?",
      intention: "Verify practical security implementation skills",
      answer:
        "Used jsonwebtoken to generate tokens with user ID and role. Middleware verifies token and checks permissions before allowing route access.",
    },
    {
      question: "How did you handle cart vs inventory consistency?",
      intention: "Assess database integrity understanding",
      answer:
        "Frontend handles UI state, backend validates stock before order confirmation to prevent overselling.",
    },
    {
      question: "How would you scale Node.js backend if traffic doubled?",
      intention: "Evaluate system design readiness",
      answer:
        "Use horizontal scaling with load balancer, multiple instances, and Redis caching to reduce DB load.",
    },
  ],

  behavioralQuestions: [
    {
      question: "Give an example of a trade-off to meet a deadline",
      intention: "Test prioritization ability",
      answer:
        "Used Recharts instead of building a custom chart library to ship faster.",
    },
    {
      question: "Describe a performance improvement you made",
      intention: "Validate performance claims",
      answer:
        "Used indexing and React memoization to improve load time by ~30%.",
    },
  ],

  skillGaps: [
    { skill: "Redis & Caching", severity: "medium" },
    { skill: "Cloud Platforms (AWS/GCP)", severity: "medium" },
    { skill: "System Design Patterns", severity: "low" },
  ],

  preparationPlan: [
    {
      day: 1,
      focus: "Redis and Caching",
      tasks: [
        "Learn Redis basics",
        "Implement cache in Node.js",
        "Study cache patterns",
      ],
    },
    {
      day: 2,
      focus: "AWS Basics",
      tasks: [
        "Learn EC2, S3, Lambda",
        "Deploy MERN app",
        "Understand VPC basics",
      ],
    },
    {
      day: 3,
      focus: "System Design",
      tasks: [
        "Load balancing concepts",
        "Sharding vs partitioning",
        "Design scalable architecture",
      ],
    },
    {
      day: 4,
      focus: "React Optimization",
      tasks: ["Learn memoization hooks", "Understand event loop and closures"],
    },
    {
      day: 5,
      focus: "Mock Interviews",
      tasks: ["Practice intro", "Deep dive into projects"],
    },
  ],

  createdAt: "2026-03-25T15:28:49.797Z",
};

export default function InterviewUI() {
  const [activeTab, setActiveTab] = useState("technical");
  const paramObj = useParams();

  const { loading, getReportByID, report } = useInterview();

  useEffect(() => {
    getReportByID(paramObj.interviewID);
  }, [paramObj.interviewID]);

  const eligibilityRotation = report?.matchScore * 3.6;
  const getQuestions = () => {
    if (activeTab === "technical") return report?.technicalQuestions;
    if (activeTab === "behavioral") return report?.behavioralQuestions;
    return [];
  };

  const getTitle = () => {
    if (activeTab === "technical") return "Technical Questions";
    if (activeTab === "behavioral") return "Behavioral Questions";
    if (activeTab === "roadmap") return "Preparation Roadmap";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* LEFT NAV */}
        <aside className="col-span-2">
          <div className="sticky top-6 space-y-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Sections
            </p>

            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  variant="ghost"
                  className={`justify-start cursor-pointer ${
                    activeTab === item.id
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : ""
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            <Button className="w-full mt-4">Download Resume</Button>
          </div>
        </aside>

        {/* CENTER */}
        <main className="col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{getTitle()}</h2>
              {activeTab !== "roadmap" && (
                <span className="text-sm text-gray-500">
                  {getQuestions()?.length} questions
                </span>
              )}
            </div>

            {/* QUESTIONS TAB */}
            {activeTab !== "roadmap" && (
              <Accordion
                type="single"
                collapsible
                className="border-none flex gap-2"
              >
                {getQuestions()?.map((q, i) => (
                  <AccordionItem key={i} value={`q-${i}`}>
                    <AccordionTrigger className="px-4 py-4 hover:no-underline">
                      <div className="flex gap-3 text-left w-full">
                        <span className="text-xs font-semibold text-red-500 mt-1">
                          Q{i + 1}
                        </span>
                        <span className="font-semibold text-gray-900 text-[15px]">
                          {q.question}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-5 space-y-4">
                      <div className="bg-gray-50 border rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase">
                          Why this is asked
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {q.intention}
                        </p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-xs font-semibold text-green-700 uppercase">
                          Ideal Answer
                        </p>
                        <p className="text-sm text-gray-800 mt-2">{q.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}

            {/* ROADMAP TAB */}
            {activeTab === "roadmap" && (
              <div className="space-y-4 mt-4">
                {report.preparationPlan.map((day) => (
                  <Card key={day.day} className="p-4">
                    <p className="text-sm font-semibold text-gray-800">
                      Day {day.day} - {day.focus}
                    </p>

                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                      {day?.tasks?.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="col-span-3 space-y-6">
          {/* MATCH SCORE */}
          <Card className="p-6 rounded-xl border bg-white">
            <p className="text-xs text-gray-400 uppercase tracking-wide text-center">
              Match Score
            </p>

            <div className="flex justify-center mt-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
                <div
                  className={`absolute inset-0 rounded-full border-8 ${report?.matchScore > 80 ? "border-green-500" : "border-red-500"} border-t-transparent`}
                  style={{ transform: `rotate(${eligibilityRotation}deg)` }}
                />
                <span className="text-2xl font-bold text-gray-800">
                  {report?.matchScore}%
                </span>
              </div>
            </div>

            <p
              className={`text-center text-sm mt-3 ${
                report?.matchScore > 80 ? "text-green-600" : "text-red-600"
              }`}
            >
              {report?.matchScore > 80
                ? "Strong match for this role"
                : "Not suited for this role"}
            </p>
          </Card>

          {/* SKILL GAPS */}
          <Card className="p-5 rounded-xl border bg-white space-y-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Skill Gaps
            </p>

            <div className="flex flex-col gap-2">
              {report?.skillGaps?.map((item) => (
                <Badge className="bg-red-100 text-red-700 w-fit">
                  {item.skill}
                </Badge>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
