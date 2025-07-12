import React, { useEffect, useState } from "react";
import axios from "axios";

function AuthHandler() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      setLoading(true);
      axios.post("/auth/token", { code }, { withCredentials: true })
        .then((res) => {
          window.history.replaceState({}, document.title, window.location.pathname);
          // Redirect or trigger login success here
          if (res.data.redirect) {
            window.location.href = res.data.redirect;
          }
        })
        .catch((err) => {
          setError("Token exchange failed");
          setLoading(false);
          console.error("Token exchange failed", err);
        });
    }
  }, []);

  if (loading) return <div>Exchanging token...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return null;
}

export default AuthHandler;
