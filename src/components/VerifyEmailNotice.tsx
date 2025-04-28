import { Link } from "react-router";

export default function VerifyEmailNotice() {
    return (
    <div className="max-w-md w-full space-y-6  ">
        <h2 className="text-2xl font-bold text-gray-900">
          Check your email
        </h2>
        <p className="text-gray-600 ">
          We've sent a confirmation link to your email address.
          <br />
          Please verify your email to activate your account.
        </p>
        <p className="text-sm text-gray-500 ">
          Once verified, you can sign in and start using DailyTrace!
        </p>

        <div className="flex gap-2 mt-4">
            <span>Already verified?</span>
            <Link
                to="/signin"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
                Sign In
            </Link>
        </div>
      </div>
    );
}