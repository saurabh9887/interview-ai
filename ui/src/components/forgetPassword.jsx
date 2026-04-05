import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { LoaderContext } from "./LoaderContext";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const { handleForgetPassword } = useAuth();
  //   const [spinner, setSpinner] = useState(false);
  const { spinner, setSpinner } = useContext(LoaderContext);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setSpinner(true);
      await handleForgetPassword(data.email);
      // ✅ Always show success (security best practice)
      setIsSent(true);
    } catch (err) {
      console.error(err);
      setIsSent(true); // still show success
    } finally {
      setSpinner(false);
    }
  };

  if (isSent) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl rounded-2xl py-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Check your email</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              If an account with that email exists, we’ve sent a password reset
              link.
            </p>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl py-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Forgot Password
          </CardTitle>
          <p className="text-sm text-gray-500 text-center">
            Enter your email to receive a reset link
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={spinner}>
              {spinner ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ForgotPassword;
