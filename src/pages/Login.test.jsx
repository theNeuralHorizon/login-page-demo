import React from "react";
import PropTypes from "prop-types";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

// 🧩 Custom wrapper for routing context
const Wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
Wrapper.propTypes = {
  children: PropTypes.node,
};

test("renders login page title", () => {
  render(<Login />, { wrapper: Wrapper });
  const title = screen.getByText(/login page/i);
  expect(title).toBeInTheDocument();
});
