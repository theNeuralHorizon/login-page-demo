import React from "react";

const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN;
const RESPONSE_TYPE = "code";
const SCOPE = "email openid";

const loginUrl = `${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;

const handleLogin = () => {
  window.location.href = loginUrl;
};

const Login = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Sign in with Cognito</button>
    </div>
  );
};

export default Login;
