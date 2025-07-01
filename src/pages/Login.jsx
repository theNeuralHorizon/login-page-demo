import React from "react";

const clientId = "3ei4p15ensv662vs08ioklnnkq"; // From your new app client
const domain = "https://eu-north-1tyieklhfi.auth.eu-north-1.amazoncognito.com";
const redirectUri = "http://localhost:3000";

const Login = () => {
  const handleLogin = () => {
    const loginUrl = `${domain}/login?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${redirectUri}`;
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
