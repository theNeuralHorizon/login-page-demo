// src/setupTests.js
import React from "react";
import PropTypes from "prop-types";

const MockRouter = ({ children }) => <div>{children}</div>;
const MockRoutes = ({ children }) => <div>{children}</div>;
const MockRoute = ({ element }) => <div>{element}</div>;

MockRouter.propTypes = {
  children: PropTypes.node,
};

MockRoutes.propTypes = {
  children: PropTypes.node,
};

MockRoute.propTypes = {
  element: PropTypes.node,
};

jest.mock("react-router-dom", () => ({
  BrowserRouter: MockRouter,
  MemoryRouter: MockRouter,
  Routes: MockRoutes,
  Route: MockRoute,
}));
