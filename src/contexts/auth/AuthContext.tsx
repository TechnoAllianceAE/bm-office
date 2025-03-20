
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  createSuperAdmin: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Define User type
interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  createSuperAdmin: async () => {},
  signOut: async () => {},
});

// Auth Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Create AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Always authenticated for now
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'admin@example.com',
    fullName: 'Admin User',
    role: 'admin',
  });

  console.info('Using mock auth provider - all auth checks bypassed');

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call
      // For now, just simulate authentication success
      setUser({
        id: '1',
        email,
        fullName: 'Test User',
        role: 'user',
      });
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign up function
  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would register the user
      // For now, just simulate registration success
      setUser({
        id: '1',
        email,
        fullName,
        role: 'user',
      });
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock create super admin function
  const createSuperAdmin = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would create a super admin
      setUser({
        id: '1',
        email,
        fullName,
        role: 'super_admin',
      });
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign out function
  const signOut = async () => {
    setIsLoading(true);
    try {
      // Would clear session in a real app
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signUp,
        createSuperAdmin,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
