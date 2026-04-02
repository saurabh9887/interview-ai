import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const onSubmit = async (data) => {
    const res = await handleLogin(data);
    if (res) navigate("/dashboard");
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* Left Side (Value Proposition) */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">
          Your Interview Plan Is Waiting
        </h1>
        <p className="text-gray-600 mb-6">
          Log in to continue your personalized, AI-driven preparation and stay
          ahead.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-black rounded-full" />
            <p className="text-gray-700">Track your progress</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-black rounded-full" />
            <p className="text-gray-700">Improve weak areas</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-black rounded-full" />
            <p className="text-gray-700">Stay consistent with prep</p>
          </div>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-xl rounded-2xl py-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center">
              Login to your account
            </CardTitle>
            <p className="text-sm text-gray-500 text-center">
              Continue your interview preparation
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...register("email")} placeholder="you@example.com" />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
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

                <p className="text-sm text-right">
                  <span className="text-primary cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </p>
              </div>

              {/* Button */}
              <Button
                type="submit"
                className="w-full h-11 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-sm text-center text-muted-foreground mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;
