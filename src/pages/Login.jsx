// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as cognitoLogin } from "../utils/cognito"; // Import the named function

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    cognitoLogin(
      email,
      password,
      (result) => {
        const token = result.getAccessToken().getJwtToken();
        localStorage.setItem("token", token);
        navigate("/profile");
      },
      (err) => {
        console.error(err);
        setError("Login failed. Please check your credentials.");
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setError("");
          setEmail(e.target.value);
        }}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setError("");
          setPassword(e.target.value);
        }}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />

      <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "0.5rem" }}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
