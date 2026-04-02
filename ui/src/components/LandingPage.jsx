import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <Link to="/">
          <h1 className="text-xl font-bold">PrepAI</h1>
        </Link>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost" className="cursor-pointer">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="cursor-pointer">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <Badge className="mb-4">AI Powered Interview Prep</Badge>
        <h2 className="text-4xl font-bold mb-6">
          Stop Preparing Blind. Know Exactly What To Study.
        </h2>
        <p className="text-gray-600 mb-8">
          Upload your resume, paste the job description, and get a precise
          interview plan tailored to what actually matters.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="cursor-pointer">
              Start Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="text-center py-10">
        <p className="text-gray-500">
          Trusted by aspiring developers & job seekers
        </p>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-8 py-16 max-w-6xl mx-auto">
        {[
          {
            title: "Smart Resume Analysis",
            desc: "AI scans your resume and identifies strengths and weak points.",
          },
          {
            title: "JD Matching Score",
            desc: "See how well you match the role with actionable insights.",
          },
          {
            title: "Interview Roadmap",
            desc: "Get a structured plan with questions, topics, and prep timeline.",
          },
        ].map((f, i) => (
          <Card key={i} className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-10">Why PrepAI?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "No Generic Prep",
                desc: "Every plan is tailored to your resume + job description.",
              },
              {
                title: "Focus on Outcomes",
                desc: "We tell you what actually gets asked — not theory.",
              },
              {
                title: "Save Time",
                desc: "Skip random prep. Focus only on what matters.",
              },
            ].map((item, i) => (
              <Card key={i} className="p-6 rounded-2xl">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-10">What Users Say</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Rahul",
              feedback:
                "This actually told me what to study. I stopped wasting time on random prep.",
            },
            {
              name: "Ankit",
              feedback:
                "The JD matching score and roadmap were insanely accurate.",
            },
            {
              name: "Sneha",
              feedback: "Got clarity in 10 minutes that I didn’t get in weeks.",
            },
          ].map((t, i) => (
            <Card key={i} className="p-6 rounded-2xl">
              <p className="text-gray-700 mb-4">"{t.feedback}"</p>
              <p className="font-semibold">- {t.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <div className="bg-gray-50 py-20 px-6">
        <section className=" max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10">How It Works</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Upload Resume",
              "Paste Job Description",
              "Get AI Interview Plan",
            ].map((step, i) => (
              <Card key={i} className="p-6 text-center rounded-2xl">
                <p className="text-3xl font-bold mb-2">{i + 1}</p>
                <p className="text-gray-700">{step}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <section className="text-center py-20 px-6">
        <h3 className="text-3xl font-bold mb-4">
          Stop Guessing. Start Preparing Smart.
        </h3>
        <p className="text-gray-600 mb-6">
          Get a targeted interview plan in minutes.
        </p>
        <Button size="lg">Try Now</Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © 2026 PrepAI. All rights reserved.
      </footer>
    </div>
  );
}
