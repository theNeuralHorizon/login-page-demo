// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login page on default route", () => {
  render(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
