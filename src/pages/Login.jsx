import React from "react";

const clientId = "YOUR_COGNITO_CLIENT_ID"; // replace this manually
const domain = "https://auth-demo.auth.eu-north-1.amazoncognito.com";

const Login = () => {
  const handleLogin = () => {
    const redirectUri = "http://localhost:3000";
    const loginUrl = `${domain}/login?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${redirectUri}`;
    window.location.href = loginUrl;
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Sign in with Cognito</button>
    </div>
  );
};

export default Login;
