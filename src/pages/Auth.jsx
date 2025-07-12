import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [confirmationCode, setConfirmationCode] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register, confirmRegistration, resendConfirmationCode } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (isSignUp) {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Register user
      const result = await register(formData.email, formData.password, {
        name: formData.name || formData.email.split('@')[0]
      });

      if (result.success) {
        setSuccess('Account created! Please check your email for verification code.');
        setNeedsConfirmation(true);
      } else {
        setError(result.error);
      }
    } else {
      // Login user
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setError(result.error);
      }
    }

    setLoading(false);
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await confirmRegistration(formData.email, confirmationCode);

    if (result.success) {
      setSuccess('Email verified! You can now sign in.');
      setNeedsConfirmation(false);
      setIsSignUp(false);
      setFormData({
        email: formData.email,
        password: '',
        confirmPassword: '',
        name: ''
      });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleResendCode = async () => {
    setLoading(true);
    const result = await resendConfirmationCode(formData.email);
    
    if (result.success) {
      setSuccess('Verification code sent!');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  if (needsConfirmation) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Verify Your Email</h2>
            <p>We've sent a verification code to {formData.email}</p>
          </div>

          <form onSubmit={handleConfirmation} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter verification code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="auth-footer">
              <button type="button" onClick={handleResendCode} className="link-button">
                Resend code
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Sign up to get started' : 'Sign in to your account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name (Optional)"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>

          <div className="auth-footer">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type="button" 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: ''
                  });
                }}
                className="link-button"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;