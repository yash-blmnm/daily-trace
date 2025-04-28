// src/pages/SignUpPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuthStore } from '../store/authStore';
import VerifyEmailNotice from '../components/VerifyEmailNotice';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const handleSignUp = useAuthStore((state) => state.handleSignUp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error: errorMessage } = await handleSignUp(email, password, name);
      if (!errorMessage) {
        setSignUpSuccess(true);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-600">
        {signUpSuccess ?
          <VerifyEmailNotice />
        :
        <>
          <h2 className="text-center text-2xl font-extrabold text-blue-600">
            Welcome to DailyTrace!
          </h2>
          <p className="text-center text-sm text-gray-600">Track your goals, reflect on your day, and stay motivated!</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center space-x-2">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link to="/signin" className="text-sm text-blue-600 hover:text-blue-800">Sign In</Link>
          </div>
        </>}
      </div>

  );
};

export default SignUpPage;
