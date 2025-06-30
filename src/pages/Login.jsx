import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin") {
        localStorage.setItem("token", "mock-token-123");
        navigate("/profile");
      } else {
        setShowError(true);
        setShowEmailError(true);
        setShowPasswordError(true);
        setEmailError("Invalid email or password.");
        setPasswordError("Invalid email or password.");
        setEmailValid(false);
        setPasswordValid(false);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        style={{
          border: emailValid ? "1px solid #ccc" : "1px solid red",
          marginBottom: "0.5rem",
          width: "100%",
          padding: "0.5rem",
        }}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailValid(true);
          setShowEmailError(false);
        }}
      />
      {showEmailError && (
        <p style={{ color: "red", marginTop: "-8px", marginBottom: "0.5rem" }}>
          {emailError}
        </p>
      )}

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        style={{
          border: passwordValid ? "1px solid #ccc" : "1px solid red",
          marginBottom: "0.5rem",
          width: "100%",
          padding: "0.5rem",
        }}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordValid(true);
          setShowPasswordError(false);
        }}
      />
      {showPasswordError && (
        <p style={{ color: "red", marginTop: "-8px", marginBottom: "0.5rem" }}>
          {passwordError}
        </p>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            style={{ marginRight: "0.5rem" }}
          />
          Show Password
        </label>
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {showError && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Invalid email or password.
        </p>
      )}
    </div>
  );
}

export default Login;
