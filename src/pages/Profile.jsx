import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/"); // Redirect to login if not authenticated
        } else {
          setError(
            "Failed to load profile: " +
              (err.response?.data?.error || err.message)
          );
        }
        setLoading(false);
      });
  }, [navigate]);

  const logout = () => {
    axios.post("/auth/logout", {}, { withCredentials: true })
      .then(() => {
        navigate("/");
      })
      .catch(err => {
        console.error("Logout failed", err);
        // Still navigate away even if backend call fails
        navigate("/");
      });
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Welcome, {user?.name || "User"}</h2>
      <div><b>Name:</b> {user?.name || "-"}</div>
      <div><b>Email:</b> {user?.email || "-"}</div>
      <div><b>Cognito sub ID:</b> {user?.sub || "-"}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
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

export default Profile;
