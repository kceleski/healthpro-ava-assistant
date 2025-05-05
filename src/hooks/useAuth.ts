
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  email: string;
  avatar_url?: string;
  full_name?: string;
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for current session
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            avatar_url: session.user.user_metadata?.avatar_url,
            full_name: session.user.user_metadata?.full_name,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Set up listener for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            avatar_url: session.user.user_metadata?.avatar_url,
            full_name: session.user.user_metadata?.full_name,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        toast.success('Signed in successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('An error occurred during sign in');
      return false;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        toast.success('Account created successfully! Please check your email for verification.');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('An error occurred during sign up');
      return false;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      toast.success('Signed out successfully');
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('An error occurred during sign out');
      return false;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      toast.success('Password reset email sent');
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('An error occurred during password reset');
      return false;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAuthenticated: !!user,
  };
}
