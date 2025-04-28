// src/components/Header.tsx
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../context/ThemeContext';
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

function Header() {
  const user = useAuthStore((state) => state.user);
  const handleSignOut = useAuthStore((state) => state.handleSignOut);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    const { error } = await handleSignOut();
    if (!error) {
      navigate('/'); // Redirect to login
    } else {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <Link to={user ? '/dashboard' : '/'} className="text-2xl font-bold text-teal-600">
        DailyTrace
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            {/* Not Logged In */}
            <Link to="/signin" className="text-teal-600 hover:underline">
              Sign In
            </Link>
            <Link to="/signup" className="bg-teal-600 text-gray-100 px-4 py-2 rounded hover:bg-teal-700">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* Logged In */}
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                  {user.email[0].toUpperCase()}
                </div>
              )}
              <span className="font-medium text-gray-600">{user.user_metadata?.full_name || user.email}</span>
              <button
                onClick={handleUserLogout}
                className="ml-4 text-teal-600 hover:underline"
              >
                Logout
              </button>
            </div>
          </>
        )}
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 rounded-full outline-none focus:outline-none transition duration-300 ease-in-out hover:bg-teal-100"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <MdOutlineLightMode className="h-6 w-6 text-teal-600" />
          ) : (
            <MdOutlineDarkMode className="h-6 w-6 text-teal-600" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
