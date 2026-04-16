import React, { useState } from 'react';

const RejectionDialog = ({ app, onConfirm, onCancel }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return alert('Please provide a reason for rejection.');
    onConfirm(app.id, reason);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.92)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000,
      padding: '1.5rem'
    }} onClick={onCancel}>
      <div style={{
        backgroundColor: '#1c1c1e',
        border: '1px solid #2c2c2e',
        borderRadius: '24px',
        maxWidth: '450px',
        width: '100%',
        padding: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,1)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'rgba(239, 68, 68, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem auto',
            color: '#ef4444',
            fontSize: '1.5rem'
          }}>
            🚫
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'white', fontWeight: 800 }}>Reject Application</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '0.8rem' }}>
            Brand: <span style={{ color: 'white', fontWeight: 600 }}>{app.vendorName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-light)' }}>
              Reason for Rejection
            </label>
            <textarea 
              placeholder="e.g. Payment transaction ID not found. Please re-apply with correct info."
              className="form-input"
              style={{ 
                minHeight: '120px', 
                padding: '1rem', 
                border: '1px solid #3a3a3c', 
                background: '#09090b',
                resize: 'none',
                lineHeight: '1.5'
              }}
              value={reason}
              onChange={e => setReason(e.target.value)}
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button 
              type="button" 
              onClick={onCancel}
              className="btn-outline"
              style={{ width: '100%', borderColor: '#3a3a3c' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', backgroundColor: '#ef4444' }}
            >
              Confirm Rejection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectionDialog;
