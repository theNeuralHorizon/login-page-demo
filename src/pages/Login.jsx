import React from "react";

const Login = () => {
  const CLIENT_ID = "3ei4p15ensv662vs08ioklnnkq";
  const REDIRECT_URI = "http://localhost:3000";
  const DOMAIN = "https://eu-north-1tyieklhfi.auth.eu-north-1.amazoncognito.com";
  const RESPONSE_TYPE = "code";
  const SCOPE = "email openid";

  const loginUrl = `${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Sign in with Cognito</button>
    </div>
  );
};

export default Login;
