import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useInterview } from "../hooks/useInterview";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ✅ Schema
const generateReportSchema = z
  .object({
    jobDescription: z
      .string()
      .min(50, "Job description is too short")
      .max(5000, "Max 5000 characters"),
    selfDescription: z.string().optional(),
    resume: z.any().optional(),
  })
  .refine((data) => data.resume || data.selfDescription, {
    message: "Either resume or self description is required",
    path: ["selfDescription"],
  });

export default function HomeUI() {
  const { loading, generateReport } = useInterview();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(generateReportSchema),
  });

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
    generateReport(data);
  };

  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center ">
        <h1>Generating your custom interview plan....</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Create Your Custom{" "}
          <span className="text-primary">Interview Plan</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Let AI analyze the job and your profile to build a winning strategy.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Main Card */}
        <Card className="max-w-6xl mx-auto shadow-xl rounded-2xl">
          <CardContent className="grid md:grid-cols-2 gap-6 p-6">
            {/* Left Panel */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  Target Job Description
                </h2>
                <Badge variant="destructive">Required</Badge>
              </div>

              <Textarea
                {...register("jobDescription")}
                placeholder="Paste full job description here..."
                className="min-h-[220px]"
              />
              {errors.jobDescription && (
                <p className="text-red-500 text-sm">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Your Profile</h2>

              {/* Upload */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Upload Resume</span>
                  <Badge variant="secondary">Best Results</Badge>
                </div>

                <Input
                  type="file"
                  {...register("resume")}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Self Description */}
              <div className="space-y-2">
                <span className="font-medium">Quick Self-Description</span>
                <Textarea
                  {...register("selfDescription")}
                  placeholder="Describe your experience, skills..."
                  className="min-h-[120px]"
                />
                {errors.selfDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.selfDescription.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-between items-center border-t p-4">
            <span className="text-sm text-muted-foreground">
              AI Strategy • ~30s
            </span>

            <Button
              type="submit"
              size="lg"
              className="rounded-xl cursor-pointer"
            >
              {loading ? "Generating..." : "Generate My Interview Strategy"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
