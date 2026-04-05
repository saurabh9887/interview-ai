import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const VerifyEmailNotice = ({ email, onResend }) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl py-8 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            We’ve sent a verification link to
          </p>
          <p className="font-medium text-gray-800 break-all">{email}</p>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm text-gray-600">
            Please check your inbox and click the verification link to activate
            your account. You won’t be able to log in until your email is
            verified.
          </p>

          <div className="space-y-3">
            <Button className="w-full" onClick={onResend}>
              Resend Email
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </div>

          <p className="text-xs text-gray-400">
            Didn’t receive the email? Check spam or try resending.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default VerifyEmailNotice;
