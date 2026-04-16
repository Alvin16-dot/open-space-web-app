import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const GATED_KEY = 'openspace2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (key === GATED_KEY) {
      onLoginSuccess();
    } else {
      setError('Invalid Security Key. Please try again.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ 
      maxWidth: '400px', 
      width: '100%', 
      margin: '6rem auto', 
      padding: '2.5rem', 
      background: 'var(--card-bg)', 
      borderRadius: '24px', 
      border: '1px solid var(--border)',
      textAlign: 'center',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          background: 'rgba(249, 115, 22, 0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1rem auto',
          color: 'var(--primary)',
          fontSize: '1.5rem'
        }}>
          🔒
        </div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)' }}>Admin Access</h2>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Please enter your security key to continue.</p>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600 }}>Security Key</label>
          <input 
            type="password"
            placeholder="••••••••"
            className="form-input"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError('');
            }}
            style={{ marginBottom: '0.5rem' }}
            autoFocus
          />
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>{error}</p>}
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
          Grant Access
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        Only authorized site administrators can access this area.
      </p>
    </div>
  );
};

export default AdminLogin;
