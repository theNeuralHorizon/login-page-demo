import React, { createContext, useContext, useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, getCurrentUser, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import awsconfig from '../aws-exports';

// Configure Amplify
Amplify.configure(awsconfig);

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const user = await signIn({
        username: email,
        password: password,
      });
      setUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, attributes = {}) => {
    try {
      const { user } = await signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          ...attributes
        },
      });
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const confirmRegistration = async (email, code) => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resendConfirmationCode = async (email) => {
    try {
      await resendSignUpCode({
        username: email,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    confirmRegistration,
    resendConfirmationCode,
    logout,
    checkAuthState,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;