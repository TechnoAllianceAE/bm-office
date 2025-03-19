
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  session: Session | null;
  user: any;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signOut: () => Promise<any>;
  isAdmin: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // Check if there are any roles in the system, if not, create default roles
    checkAndCreateDefaultRoles();

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile data including role
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
        setIsAdmin(false);
      } else {
        setUser(data);
        setIsAdmin(data.role === 'Admin');
        
        // Update last login time
        await supabase
          .from('app_users')
          .update({ last_login: new Date().toISOString() })
          .eq('user_id', userId);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if there are any roles in the system, if not create default roles
  const checkAndCreateDefaultRoles = async () => {
    try {
      // Check if roles table has data
      const { data: roles, error: rolesError } = await supabase
        .from('roles')
        .select('id')
        .limit(1);

      if (rolesError) throw rolesError;

      // If no roles exist, create default roles
      if (roles.length === 0) {
        console.log('No roles found, creating default roles...');
        
        // Insert default roles
        await supabase
          .from('roles')
          .insert([
            { name: 'Admin', description: 'Full system access' },
            { name: 'Manager', description: 'Department management access' },
            { name: 'User', description: 'Basic system access' }
          ]);

        toast({
          title: "Default roles created",
          description: "Admin, Manager, and User roles have been created.",
        });
      }
    } catch (error) {
      console.error('Error checking/creating default roles:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) throw error;
      
      // Check if this is the first user, if yes, make them an admin
      const { count, error: countError } = await supabase
        .from('app_users')
        .select('*', { count: 'exact', head: true });
        
      if (!countError && count === 1) {
        // This is the first user, make them an admin
        await supabase
          .from('app_users')
          .update({ role: 'Admin' })
          .eq('email', email);
          
        toast({
          title: "Admin account created",
          description: "As the first user, you have been assigned the Admin role.",
        });
      }
      
      return data;
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut,
    isAdmin,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
