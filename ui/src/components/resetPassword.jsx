import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderContext } from "./LoaderContext";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { handleResetPassword } = useAuth();

  //   const [spinner, setSpinner] = useState(false);
  const { spinner, setSpinner } = useContext(LoaderContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setSpinner(true);
      setError("");

      await handleResetPassword(token, data.password);

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSpinner(false);
    }
  };

  // ✅ Success UI
  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl rounded-2xl py-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Password Updated</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Your password has been reset successfully. You can now log in.
            </p>

            <Button className="w-full" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  // 🧾 Form UI
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl py-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <p className="text-sm text-gray-500 text-center">
            Enter your new password below
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Password */}
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword", { required: true })}
              />
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full" disabled={spinner}>
              {spinner ? "Updating..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ResetPassword;
