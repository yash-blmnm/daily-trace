// src/lib/supabaseActions.ts
import { supabase } from './dBClient';

export async function signUp(email: string, password: string, fullName: string) {
  try {
    const { data: authdata, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return { error: error.message };
    }

    if (authdata.user) {
      const { id, email: userEmail } = authdata.user;

      const { error: insertError } = await supabase.from('users').insert([
        {
          id: id,              
          name: fullName,
          email: userEmail,
        }
      ]);


      if (insertError) {
        return { error: insertError.message };
      }

    }

    return { authdata };
  } catch (err) {
    return { error: 'An unexpected error occurred during signup.' };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'An unexpected error occurred during signin.' };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message };
    }

    return { data: 'Signed out successfully' };
  } catch (err) {
    return { error: 'An unexpected error occurred during logout.' };
  }
}

export async function fetchUserSession() {  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return { session };
  } catch (error) {
    console.error('Error fetching session:', error);
    return { session: null };
  }
}

export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'An unexpected error occurred during password reset.' };
  }
}
export async function updateUserProfile(userId: string, profileData: any) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(profileData)
      .eq('id', userId);

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'An unexpected error occurred while updating the profile.' };
  }
}

