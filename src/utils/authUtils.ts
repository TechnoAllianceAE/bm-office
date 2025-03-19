
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Fetches the role of the specified user
 */
export const fetchUserRole = async (userId: string): Promise<string | null> => {
  try {
    console.log('Fetching role for user ID:', userId);
    const { data, error } = await supabase
      .from('app_users')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    console.log('Role data:', data);
    return data?.role || null;
  } catch (error) {
    console.error('Error in fetchUserRole:', error);
    return null;
  }
};

/**
 * Checks if the user is a Super Admin by calling the Edge Function
 */
export const checkSuperAdminStatus = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke<boolean>('is_super_admin', {
      body: { user_id_param: userId },
    });

    if (error) {
      console.error('Error checking super admin status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in checkSuperAdminStatus:', error);
    return false;
  }
};

/**
 * Sign in with email and password
 */
export const signInWithCredentials = async (email: string, password: string) => {
  // Add a small delay to ensure UI updates are visible
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error);
    let errorMessage = 'Failed to sign in';
    if (error.message.includes('Invalid login')) {
      errorMessage = 'Invalid email or password';
    }
    toast.error(errorMessage);
    throw error;
  }

  if (!data.user) {
    const noUserError = new Error('Sign in successful but no user data returned');
    console.error(noUserError);
    toast.error('Authentication error');
    throw noUserError;
  }

  return { user: data.user, session: data.session };
};

/**
 * Sign up with email, password, and full name
 */
export const signUpWithCredentials = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error('Error signing up:', error);
    let errorMessage = 'Failed to sign up';
    if (error.message.includes('already registered')) {
      errorMessage = 'This email is already registered';
    }
    toast.error(errorMessage);
    throw error;
  }

  toast.success('Sign up successful', {
    description: 'Please check your email to confirm your account.',
  });

  return { user: data.user, session: data.session };
};

/**
 * Sign out the current user
 */
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    toast.error('Failed to sign out');
    throw error;
  }
  toast.success('Signed out successfully');
};

/**
 * Creates a Super Admin user
 */
export const createSuperAdminUser = async (email: string, password: string, fullName: string) => {
  try {
    // First, create the user in Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (userError) {
      console.error('Error creating user:', userError);
      toast.error('Failed to create Super Admin user');
      throw userError;
    }

    if (!userData.user) {
      const error = new Error('User creation successful but no user data returned');
      console.error(error);
      toast.error('Failed to create Super Admin user');
      throw error;
    }

    // Call the Edge Function to set the user as a Super Admin
    const { data, error } = await supabase.functions.invoke<{ success: boolean }>('create-super-admin', {
      body: { 
        userId: userData.user.id, 
        email, 
        fullName 
      },
    });

    if (error) {
      console.error('Error creating Super Admin:', error);
      toast.error('User created, but Super Admin role assignment failed');
      throw error;
    }

    toast.success('Super Admin created successfully', {
      description: 'You can now sign in with these credentials.',
    });

    return userData.user;
  } catch (error) {
    console.error('createSuperAdminUser error:', error);
    throw error;
  }
};
