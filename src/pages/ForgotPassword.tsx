import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router';

export default function ForgotPasswordPage() {
  const handleResetPassword = useAuthStore((state) => state.handleResetPassword);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const { error } = await handleResetPassword(email);

    if (error) {
      setErrorMessage(error);
    } else {
      setSuccessMessage('A password reset link has been sent to your email.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md w-full bg-white text-gray-600 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 mb-4">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="mt-4 text-green-600 text-sm text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <div className="flex gap-2 w-full items-center text-sm text-center mt-6">
          <span>Remember your password?</span>
          <Link
            to="/signin"
            className="font-medium text-teal-600 hover:text-teal-500"
          >
             Sign In
          </Link>
        </div>
    </div>
  );
}
