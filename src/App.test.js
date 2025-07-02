import React from "react";
import PropTypes from "prop-types";
import { render, screen } from "@testing-library/react";
import App from "./App";

// ✅ Mock react-router-dom
jest.mock("react-router-dom", () => {
  const React = require("react");

  const BrowserRouter = ({ children }) => <div>{children}</div>;
  const Routes = ({ children }) => <div>{children}</div>;
  const Route = ({ element }) => <div>{element}</div>;

  // ✅ Add PropTypes
  BrowserRouter.propTypes = {
    children: PropTypes.node,
  };

  Routes.propTypes = {
    children: PropTypes.node,
  };

  Route.propTypes = {
    element: PropTypes.node,
  };

  return {
    BrowserRouter,
    Routes,
    Route,
  };
});

test("renders Sign in with Cognito button", () => {
  render(<App />);
  const button = screen.getByText("Sign in with Cognito");
  expect(button).toBeInTheDocument();
});
