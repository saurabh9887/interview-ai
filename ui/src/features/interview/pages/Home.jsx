import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function HomeUI() {
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

      {/* Main Card */}
      <Card className="max-w-6xl mx-auto shadow-xl rounded-2xl">
        <CardContent className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left Panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Target Job Description</h2>
              <Badge variant="destructive">Required</Badge>
            </div>

            <Textarea
              placeholder="Paste full job description here..."
              className="min-h-[220px]"
            />

            <p className="text-sm text-muted-foreground text-right">
              0 / 5000 chars
            </p>
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

              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-muted transition">
                <p className="font-medium">Click to upload or drag & drop</p>
                <p className="text-sm text-muted-foreground">
                  PDF or DOCX (Max 5MB)
                </p>
                <Input type="file" className="hidden" />
              </label>
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
                placeholder="Describe your experience, skills..."
                className="min-h-[120px]"
              />
            </div>

            {/* Info Box */}
            <div className="flex gap-2 bg-muted p-3 rounded-lg text-sm">
              <span>ℹ️</span>
              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required.
              </p>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-between items-center border-t p-4">
          <span className="text-sm text-muted-foreground">
            AI Strategy • ~30s
          </span>

          <Button size="lg" className="rounded-xl">
            Generate My Interview Strategy
          </Button>
        </CardFooter>
      </Card>

      {/* Recent Reports */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          My Recent Interview Plans
        </h2>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 border rounded-xl hover:shadow cursor-pointer transition"
            >
              <h3 className="font-semibold">Frontend Developer</h3>
              <p className="text-sm text-muted-foreground">
                Generated on 12 Mar 2026
              </p>
              <p className="text-sm font-medium text-green-600">
                Match Score: 85%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-6 mt-10 text-sm text-muted-foreground">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </div>
    </div>
  );
}
