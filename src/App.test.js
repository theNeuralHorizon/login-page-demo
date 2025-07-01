// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// 👇 MOCKING react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
}));

test("renders login button from App", () => {
  render(<App />);
  expect(screen.getByText(/sign in with cognito/i)).toBeInTheDocument();
});
