// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://your-cognito-domain.auth.eu-north-1.amazoncognito.com",
  client_id: "your-client-id",
  redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "openid email"
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
