
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const fetchUserRole = async (userId: string): Promise<string | null> => {
  try {
    // First try the regular way
    const { data, error } = await supabase
      .from('app_users')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user role:', error);
      
      // If the regular way fails, try using RPC for Super Admin
      // Fix the type error by properly typing the RPC function parameters
      const { data: adminData, error: adminError } = await supabase
        .rpc('is_super_admin', { user_id_param: userId });
      
      if (adminError) {
        console.error('Error checking if user is Super Admin:', adminError);
        return null;
      }
      
      if (adminData === true) {
        return 'Super Admin';
      }
      
      // Default to User role if all checks fail
      return 'User';
    }

    return data?.role || null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    // Default to User role if all checks fail
    return 'User';
  }
};

export const signInWithCredentials = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    toast.error('Login failed', { description: error.message });
    throw error;
  }
  
  return data;
};

export const signUpWithCredentials = async (email: string, password: string, fullName: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });
  
  if (error) {
    toast.error('Sign up failed', { description: error.message });
    throw error;
  }
  
  toast.success('Sign up successful', { 
    description: 'Please check your email for verification link'
  });
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.warn("Supabase signOut error:", error.message);
    }
  } catch (supabaseError) {
    console.warn("Supabase signOut exception:", supabaseError);
  }
};

export const createSuperAdminUser = async (email: string, password: string, fullName: string) => {
  try {
    // Fix the type error by properly specifying the function parameters
    const response = await supabase.functions.invoke('create-super-admin', {
      body: { email, password, fullName }
    });
    
    if (response.error) {
      console.error('Super Admin creation error:', response.error);
      toast.error('Failed to create Super Admin', { 
        description: response.error.message || 'Unknown error occurred'
      });
      throw new Error(response.error.message || 'Failed to create Super Admin');
    }
    
    toast.success('Super Admin created successfully');
    return response.data;
  } catch (error) {
    console.error('Error in createSuperAdminUser:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    toast.error('Failed to create Super Admin', { description: errorMessage });
    throw error;
  }
};

export const checkSuperAdminStatus = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .rpc('is_super_admin', { user_id_param: userId });
    
    if (error) {
      console.error('Error checking if user is Super Admin:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error in checkSuperAdminStatus:', error);
    return false;
  }
};
