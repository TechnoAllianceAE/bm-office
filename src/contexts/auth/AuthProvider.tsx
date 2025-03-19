
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContext } from './AuthContext';
import {
  fetchUserRole,
  signInWithCredentials,
  signUpWithCredentials,
  signOutUser,
  createSuperAdminUser,
  checkSuperAdminStatus
} from '@/utils/authUtils';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        // Try to get role from user metadata first
        if (session.user.user_metadata?.role) {
          setUserRole(session.user.user_metadata.role);
        } else {
          // If not in metadata, try to fetch from database
          fetchUserRole(session.user.id).then(role => {
            setUserRole(role);
          });
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (session?.user) {
          // Try to get role from user metadata first
          if (session.user.user_metadata?.role) {
            setUserRole(session.user.user_metadata.role);
          } else {
            // If not in metadata, try to fetch from database
            const role = await fetchUserRole(session.user.id);
            setUserRole(role);
          }
        } else {
          setUserRole(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user } = await signInWithCredentials(email, password);
      
      // Check if this user is a Super Admin
      if (user) {
        const isSuperAdmin = await checkSuperAdminStatus(user.id);
        if (isSuperAdmin) {
          setUserRole('Super Admin');
        }
      }
      
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      await signUpWithCredentials(email, password, fullName);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // First, clear local state regardless of API call outcome
      setSession(null);
      setUser(null);
      setUserRole(null);
      
      // Then attempt to sign out from Supabase
      await signOutUser();
      
      // Return success - user is considered signed out locally regardless of API result
      return;
    } catch (error) {
      console.error('Error in signOut function:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createSuperAdmin = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      return await createSuperAdminUser(email, password, fullName);
    } catch (error) {
      console.error('Error creating Super Admin:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
        createSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
