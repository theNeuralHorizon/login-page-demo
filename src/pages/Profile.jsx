import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserAttributes } from "aws-amplify/auth";
import "./Profile.css";

function Profile() {
  const [userAttributes, setUserAttributes] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const loadUserAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserAttributes();
    }
  }, [user]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      // Redirect will be handled by the routing logic in App.js
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="loading">Loading user information...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {(userAttributes.name || userAttributes.email || "U").charAt(0).toUpperCase()}
          </div>
          <h2>Welcome, {userAttributes.name || userAttributes.email?.split('@')[0] || 'User'}!</h2>
        </div>
        
        <div className="profile-content">
          <div className="profile-section">
            <h3>Account Information</h3>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{userAttributes.name || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{userAttributes.email || 'Not available'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Status:</span>
                <span className={`info-value ${userAttributes.email_verified ? 'verified' : 'unverified'}`}>
                  {userAttributes.email_verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Status:</span>
                <span className="info-value active">Active</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Security</h3>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value user-id">{user?.userId || 'Not available'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Sign-In Method:</span>
                <span className="info-value">Email & Password</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-button">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
