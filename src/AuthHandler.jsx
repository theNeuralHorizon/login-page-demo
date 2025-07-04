import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function AuthHandler({ tokenKey = "access_token" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setLoading(true);
      axios.post("/auth/token", { code })
        .then(res => {
          localStorage.setItem(tokenKey, res.data.access_token);
          setLoading(false);
          // Optionally redirect or update UI
        })
        .catch(err => {
          setError("Token exchange failed");
          setLoading(false);
          console.error("Token exchange failed", err);
        });
    }
  }, [tokenKey]);
  if (loading) return <div>Exchanging token...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  return null;
}

AuthHandler.propTypes = {
  tokenKey: PropTypes.string
};

export default AuthHandler;
