import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useContext, useState } from "react";
import { LoaderContext } from "@/components/LoaderContext";
import VerifyEmailNotice from "@/components/verifyEmailNotice";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { handleRegister } = useAuth();
  const { spinner } = useContext(LoaderContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await handleRegister(data);
    if (res) {
      setUserEmail(data.email);
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <VerifyEmailNotice
        email={userEmail}
        onResend={() => handleRegister({ email: userEmail, resend: true })}
      />
    );
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* Left Side (Branding / Value Prop) */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">Start Preparing Smarter</h1>
        <p className="text-gray-600 mb-6">
          Upload your resume, paste the job description, and get a precise
          interview plan tailored to what actually matters.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-black rounded-full" />
            <p className="text-gray-700">Know your exact skill gaps</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-black rounded-full" />
            <p className="text-gray-700">Get real interview questions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-black rounded-full" />
            <p className="text-gray-700">Follow a structured prep roadmap</p>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-xl rounded-2xl py-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center">
              Create your account
            </CardTitle>
            <p className="text-sm text-gray-500 text-center">
              Start your personalized interview preparation
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input {...register("username")} placeholder="john_doe" />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...register("email")} placeholder="you@example.com" />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={spinner}
              >
                {spinner ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
