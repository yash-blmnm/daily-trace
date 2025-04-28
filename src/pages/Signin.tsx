import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthActions } from '../hooks/useAuthActions';

function SignIn() {
  const navigate = useNavigate();
  const { handleSignIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const { error } = await handleSignIn(email, password);

    if (error) {
      setErrorMessage(error);
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-gray-600">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Welcome back to DailyTrace
      </h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-600">
        New here?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
