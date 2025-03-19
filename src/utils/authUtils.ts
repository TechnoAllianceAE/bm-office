
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
      // Using Function type assertion to bypass TypeScript errors
      const adminCall = (supabase.rpc as Function);
      const adminResult = await adminCall('is_super_admin', { user_id_param: userId });
      
      const adminData = adminResult.data;
      const adminError = adminResult.error;
      
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
  // Using type assertion to bypass TypeScript errors
  const authClient = (supabase.auth as AnyRecord);
  const signInMethod = authClient.signInWithPassword as Function;
  
  const { data, error } = await signInMethod({ email, password });
  
  if (error) {
    toast.error('Login failed', { description: error.message });
    throw error;
  }
  
  return data;
};

export const signUpWithCredentials = async (email: string, password: string, fullName: string) => {
  // Using type assertion to bypass TypeScript errors
  const authClient = (supabase.auth as AnyRecord);
  const signUpMethod = authClient.signUp as Function;
  
  const { error } = await signUpMethod({
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
    // Using type assertion to bypass TypeScript errors
    const authClient = (supabase.auth as AnyRecord);
    const signOutMethod = authClient.signOut as Function;
    
    const { error } = await signOutMethod();
    
    if (error) {
      console.warn("Supabase signOut error:", error.message);
    }
  } catch (supabaseError) {
    console.warn("Supabase signOut exception:", supabaseError);
  }
};

export const createSuperAdminUser = async (email: string, password: string, fullName: string) => {
  try {
    const functionsClient = (supabase as AnyRecord).functions;
    const invokeMethod = functionsClient.invoke as Function;
    
    const response = await invokeMethod('create-super-admin', {
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
    // Using Function type assertion to bypass TypeScript errors
    const rpcCall = (supabase.rpc as Function);
    const result = await rpcCall('is_super_admin', { user_id_param: userId });
    
    const data = result.data;
    const error = result.error;
    
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
