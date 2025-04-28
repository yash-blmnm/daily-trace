import { signIn, signUp, resetPassword, signOut } from '../lib/authActions';
import { useAuthStore } from '../store/authStore';

export function useAuthActions() {
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    const { authdata, error } = await signUp(email, password, fullName);

    if (error) {
      return { error };
    }

    return { authdata };
  };

  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await signIn(email, password);

    if (error) {
      return { error };
    }

    if (data?.user) {
      console.log(data?.user)
      setUser(data.user); // Set in store
    }

    return { data };
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      setUser(null);
    }
    return { error };
  };

  const handleResetPassword = async (email: string) => {
    const { data, error } = await resetPassword(email);
    return { data, error };
  };

  return {
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleResetPassword,
  };
}
