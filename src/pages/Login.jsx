import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setEmailError("");
    setPasswordError("");
    setFormError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay

      if (email === "admin@gmail.com" && password === "admin") {
        if (rememberMe) localStorage.setItem("rememberedEmail", email);
        else localStorage.removeItem("rememberedEmail");

        localStorage.setItem("token", "mock-token-123");
        navigate("/profile");
      } else {
        setFormError("Invalid email or password.");
      }
    } catch (err) {
      setFormError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <h2>Login</h2>

      <input
        autoFocus
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "0.5rem",
          border: emailError ? "1px solid red" : "1px solid #ccc",
        }}
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "0.5rem",
          border: passwordError ? "1px solid red" : "1px solid #ccc",
        }}
      />
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <span style={{ marginLeft: "0.5rem" }}>Show Password</span>
      </label>

      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <span style={{ marginLeft: "0.5rem" }}>Remember Me</span>
      </label>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        style={{
          padding: "0.75rem",
          backgroundColor: isFormValid ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          cursor: isFormValid ? "pointer" : "not-allowed",
        }}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/signup">Sign Up</a>
      </div>

      {formError && <p style={{ color: "red" }}>{formError}</p>}
    </form>
  );
}

export default Login;
