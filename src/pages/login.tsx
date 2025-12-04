// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import { LoginData } from '../types/user';
import Layout from '@theme/Layout';
import { authService } from '../services/authService';
import Link from '@docusaurus/Link';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await authService.login(formData);
      // Redirect to home page after successful login
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Login" description="Login to access your personalized content">
      <div className="auth-container">
        <div className="auth-bg-circle auth-bg-circle-1"></div>
        <div className="auth-bg-circle auth-bg-circle-2"></div>

        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 className="auth-title">
              Welcome Back! <span className="text-gradient">👋</span>
            </h1>
            <p className="auth-subtitle">
              Sign in to continue your journey into Physical AI
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                borderRadius: '12px',
                color: '#fca5a5',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(4px)'
              }}>
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="auth-input-group">
              <label className="auth-label">
                Email Address
              </label>
              <input
                className="auth-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <label className="auth-label">
                Password
              </label>
              <input
                className="auth-input"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;