import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthHandler from "./AuthHandler";

const TOKEN_KEY = "access_token";

function App() {
  return (
    <>
      <AuthHandler tokenKey={TOKEN_KEY} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile tokenKey={TOKEN_KEY} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
