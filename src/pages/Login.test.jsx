// src/pages/Login.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

// 👇 MOCKING react-router-dom
jest.mock("react-router-dom", () => ({
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

test("renders login page title", () => {
  render(<Login />);
  expect(screen.getByText(/sign in with cognito/i)).toBeInTheDocument();
});
