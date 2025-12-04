// frontend/src/components/Auth/SignupForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { SignupData, UserPreferences } from '../../types/user';

interface SignupFormProps {
  onSubmit: (data: SignupData) => void;
  isLoading: boolean;
  error: string | null;
}

// Custom Dropdown Component
interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder || 'Select...';

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`custom-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-dropdown-item ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<UserPreferences['level']>('beginner');
  const [languages, setLanguages] = useState('');
  const [aiExperience, setAiExperience] = useState<UserPreferences['aiExperience']>('none');
  const [hardwareKnowledge, setHardwareKnowledge] = useState<UserPreferences['hardwareKnowledge']>('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preferences: UserPreferences = {
      level,
      languages: languages.split(',').map(lang => lang.trim()).filter(lang => lang),
      aiExperience,
      hardwareKnowledge,
    };
    onSubmit({ email, password, name, preferences });
  };

  return (
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

      {/* Row 1: Name & Email */}
      <div className="auth-grid">
        <div className="auth-input-group">
          <label className="auth-label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Row 2: Password (Full Width) */}
      <div className="auth-input-group">
        <label className="auth-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          placeholder="Min. 8 characters"
        />
      </div>

      <div style={{ margin: '2rem 0 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>
      <h3 className="auth-subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem', color: '#e2e8f0' }}>
        Personalization
      </h3>

      {/* Row 3: Experience & Languages */}
      <div className="auth-grid">
        <div className="auth-input-group">
          <label className="auth-label">
            Programming Experience
          </label>
          <CustomSelect
            value={level}
            onChange={(val) => setLevel(val as UserPreferences['level'])}
            options={[
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' }
            ]}
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="languages">
            Programming Languages
          </label>
          <input
            type="text"
            id="languages"
            className="auth-input"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="e.g., Python, JavaScript, C++"
          />
        </div>
      </div>

      {/* Row 4: AI & Hardware */}
      <div className="auth-grid">
        <div className="auth-input-group">
          <label className="auth-label">
            AI/ML Experience
          </label>
          <CustomSelect
            value={aiExperience}
            onChange={(val) => setAiExperience(val as UserPreferences['aiExperience'])}
            options={[
              { value: 'none', label: 'None' },
              { value: 'basic', label: 'Basic' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' }
            ]}
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label">
            Hardware Knowledge
          </label>
          <CustomSelect
            value={hardwareKnowledge}
            onChange={(val) => setHardwareKnowledge(val as UserPreferences['hardwareKnowledge'])}
            options={[
              { value: 'basic', label: 'Basic' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' }
            ]}
          />
        </div>
      </div>

      <button
        type="submit"
        className="auth-button"
        disabled={isLoading}
        style={{ marginTop: '1rem' }}
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
