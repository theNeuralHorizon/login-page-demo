import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile({ tokenKey = "access_token" }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found. Please log in.");
      setLoading(false);
      return;
    }
    axios
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data.user || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(
          "Failed to load profile: " +
            (err.response?.data?.error || err.message)
        );
        setLoading(false);
      });
  }, [tokenKey]);

  const logout = () => {
    localStorage.removeItem(tokenKey);
    navigate("/");
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Welcome, {profile.name || profile.email || "User"}</h2>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <button
        onClick={logout}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

Profile.propTypes = {
  tokenKey: PropTypes.string,
};

export default Profile;
