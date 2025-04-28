import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from './context/ThemeContext'
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import ForgotPassword from './pages/ForgotPassword'
import GoalPage from './pages/Goals'

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider>
      <Header />
      <div className="min-h-[calc(100vh-114px)] flex items-center justify-center bg-gray-50 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goals/new" element={<GoalPage />} />
            <Route path="/goals/:id" element={<GoalPage />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
