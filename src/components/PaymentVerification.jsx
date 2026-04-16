import React, { useState } from 'react';

const PaymentVerification = ({ event, price, onCancel, onSubmit }) => {
  const [txId, setTxId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!txId) return alert('Please enter your Transaction ID');
    onSubmit(txId);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1.5rem'
    }} onClick={onCancel}>
      <div style={{
        backgroundColor: '#1e1e1e',
        border: '1px solid #27272a',
        borderRadius: '24px',
        maxWidth: '450px',
        width: '100%',
        padding: '2.5rem',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onCancel}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#52525b', fontSize: '1.5rem', cursor: 'pointer' }}
        >×</button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'rgba(16, 185, 129, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem auto',
            color: '#10b981',
            fontSize: '1.5rem'
          }}>
            📋
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'white', fontWeight: 800 }}>Submit Payment Proof</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
            Event: <span style={{ color: 'white', fontWeight: 600 }}>{event.title}</span>
          </p>
        </div>

        <div style={{ background: '#121212', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Amount to Pay:</span>
            <span style={{ color: 'var(--success)', fontWeight: 800, fontSize: '1.1rem' }}>{price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Merchant Number:</span>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>0123456789</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-light)' }}>
              MoMo Transaction ID
            </label>
            <input 
              type="text" 
              placeholder="e.g. 1029384756"
              className="form-input"
              style={{ padding: '1rem', border: '1px solid var(--primary)', background: 'rgba(249, 115, 22, 0.05)' }}
              value={txId}
              onChange={e => setTxId(e.target.value)}
              autoFocus
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.8rem', lineHeight: '1.4' }}>
              ℹ️ Please enter the Transaction ID from the SMS message you received after paying.
            </p>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}>
            Submit for Verification →
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentVerification;
