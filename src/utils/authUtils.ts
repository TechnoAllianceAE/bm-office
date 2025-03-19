
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Helper type for type assertions
type AnyRecord = Record<string, any>;

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
      try {
        const { data: adminData, error: adminError } = await supabase.rpc('is_super_admin', { 
          user_id_param: userId 
        } as { user_id_param: string });
        
        if (adminError) {
          console.error('Error checking if user is Super Admin:', adminError);
          return null;
        }
        
        if (adminData === true) {
          return 'Super Admin';
        }
      } catch (rpcError) {
        console.error('Error in RPC call:', rpcError);
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
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      toast.error('Login failed', { description: error.message });
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUpWithCredentials = async (email: string, password: string, fullName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
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
    
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
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
    const { data, error } = await supabase.functions.invoke('create-super-admin', {
      body: { email, password, fullName }
    });
    
    if (error) {
      console.error('Super Admin creation error:', error);
      toast.error('Failed to create Super Admin', { 
        description: error.message || 'Unknown error occurred'
      });
      throw new Error(error.message || 'Failed to create Super Admin');
    }
    
    toast.success('Super Admin created successfully');
    return data;
  } catch (error) {
    console.error('Error in createSuperAdminUser:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    toast.error('Failed to create Super Admin', { description: errorMessage });
    throw error;
  }
};

export const checkSuperAdminStatus = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('is_super_admin', { 
      user_id_param: userId 
    } as { user_id_param: string });
    
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
