// src/pages/Auth.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Auth from "./Auth";
import { AuthProvider } from "../context/AuthContext";

// Mock AWS Amplify
jest.mock('aws-amplify', () => ({
  Amplify: {
    configure: jest.fn(),
  },
}));

jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
  getCurrentUser: jest.fn(),
  confirmSignUp: jest.fn(),
  resendSignUpCode: jest.fn(),
  fetchUserAttributes: jest.fn(),
}));

const AuthWrapper = ({ children }) => (
  <AuthProvider>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </AuthProvider>
);

test("renders auth page with sign in form", () => {
  render(
    <AuthWrapper>
      <Auth />
    </AuthWrapper>
  );
  expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
});

test("renders sign up form when sign up is selected", () => {
  render(
    <AuthWrapper>
      <Auth />
    </AuthWrapper>
  );
  
  const signUpButton = screen.getByText(/Sign Up/i);
  expect(signUpButton).toBeInTheDocument();
});
