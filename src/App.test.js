import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Login page heading", () => {
  render(<App />);
  const heading = screen.getByText(/login page/i);
  expect(heading).toBeInTheDocument();
});
