import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Your interview preparation overview</p>
        </div>
        <Button>New Analysis</Button>
      </div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Match Score</p>
            <h2 className="text-3xl font-bold">82%</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Skill Gaps</p>
            <h2 className="text-3xl font-bold">4</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Prep Progress</p>
            <h2 className="text-3xl font-bold">60%</h2>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Skill Gaps */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Skill Gaps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["System Design", "React Performance", "DB Indexing"].map(
              (skill, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border rounded-lg px-3 py-2"
                >
                  <span>{skill}</span>
                  <Badge variant="secondary">Improve</Badge>
                </div>
              ),
            )}
          </CardContent>
        </Card>

        {/* Questions */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Interview Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Explain Virtual DOM in React",
              "How to optimize API calls?",
              "What is indexing in databases?",
            ].map((q, i) => (
              <div
                key={i}
                className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
              >
                {q}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Roadmap */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Preparation Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Day 1-2",
                desc: "Revise fundamentals & core concepts",
              },
              {
                title: "Day 3-5",
                desc: "Practice interview questions",
              },
              {
                title: "Day 6-7",
                desc: "Mock interviews & refinement",
              },
            ].map((step, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
