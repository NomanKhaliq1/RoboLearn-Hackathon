// frontend/src/pages/signup.tsx
import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import SignupForm from '../components/Auth/SignupForm';
import { authService } from '../services/authService';
import { SignupData } from '../types/user';
import Link from '@docusaurus/Link';

const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signup(data);
      history.push('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during signup.');
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Sign Up"
      description="Sign up for an account to personalize your Docusaurus experience."
    >
      <div className="auth-container">
        <div className="auth-bg-circle auth-bg-circle-1"></div>
        <div className="auth-bg-circle auth-bg-circle-2"></div>

        <div className="auth-card" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 className="auth-title">
              Create Account <span className="text-gradient">🚀</span>
            </h1>
            <p className="auth-subtitle">
              Join the future of Humanoid Robotics
            </p>
          </div>

          <SignupForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;