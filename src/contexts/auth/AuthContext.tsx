
import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  createSuperAdmin: (email: string, password: string, fullName: string) => Promise<User>;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  userRole: null,
  isLoading: true,
  signIn: async () => null,
  signUp: async () => ({ user: null, session: null }),
  signOut: async () => {},
  isAuthenticated: false,
  createSuperAdmin: async () => { return {} as User; },
});

export const useAuth = () => useContext(AuthContext);
