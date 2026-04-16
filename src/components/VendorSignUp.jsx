import React, { useState } from 'react';

const VendorSignUp = ({ onSignUpCompleted }) => {
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [vendorType, setVendorType] = useState('external'); // 'external' or 'student'
  const [studentId, setStudentId] = useState('');

  const STUDENT_DOMAINS = [
    'st.ug.edu.gh',    // University of Ghana
    'st.knust.edu.gh', // KNUST
    'ashesi.edu.gh',   // Ashesi
    'stu.ucc.edu.gh',  // UCC
    'acity.edu.gh',    // Academic City
    'central.edu.gh',  // Central University
    'st.uds.edu.gh',   // UDS
    'gctu.edu.gh',     // GCTU
    'st.umat.edu.gh'   // UMaT
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!brandName || !email) return alert('Please fill in all details');
    
    if (vendorType === 'student') {
      const emailDomain = email.split('@')[1];
      const isValidStudentEmail = STUDENT_DOMAINS.includes(emailDomain?.toLowerCase());

      if (!isValidStudentEmail) {
        return alert(`To unlock student discounts, please use a valid university email (e.g., name@st.ug.edu.gh or name@ashesi.edu.gh).`);
      }
      if (!studentId) return alert('Please provide your Student ID number.');
    }
    
    // Simulate API registration successfully
    const dummyVendorData = { 
      id: 'vendor_' + Math.random().toString(36).substr(2, 4), 
      brandName, 
      email,
      type: vendorType,
      studentId: vendorType === 'student' ? studentId : null
    };
    onSignUpCompleted(dummyVendorData);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', maxWidth: '450px', width: '100%', margin: '4rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 800 }}>Join OpenSpace</h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-light)' }}>Secure your stall at the next big campus market.</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: '#121212', padding: '0.3rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <button 
          onClick={() => setVendorType('external')}
          style={{ 
            flex: 1, 
            padding: '0.8rem', 
            borderRadius: '10px', 
            border: 'none', 
            background: vendorType === 'external' ? 'var(--card-bg)' : 'transparent', 
            color: vendorType === 'external' ? 'white' : 'var(--text-light)',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >External Brand</button>
        <button 
          onClick={() => setVendorType('student')}
          style={{ 
            flex: 1, 
            padding: '0.8rem', 
            borderRadius: '10px', 
            border: 'none', 
            background: vendorType === 'student' ? 'var(--card-bg)' : 'transparent', 
            color: vendorType === 'student' ? 'white' : 'var(--text-light)',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >Student Vendor</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-light)' }}>Vendor / Brand Name</label>
          <input 
            type="text" 
            placeholder="e.g. Campus Bites"
            className="form-input"
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
          />
        </div>
        
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-light)' }}>Business Email</label>
          <input 
            type="email" 
            placeholder={vendorType === 'student' ? "e.g. name@st.ug.edu.gh" : "hello@brand.com"}
            className="form-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {vendorType === 'student' && (
            <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.4rem' }}>
              ℹ️ Use your university email to unlock student discounts.
            </p>
          )}
        </div>

        {vendorType === 'student' && (
          <div className="animate-fade-in" style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>Student ID Number</label>
            <input 
              type="text" 
              placeholder="e.g. 10293847"
              className="form-input"
              style={{ borderColor: 'var(--primary)' }}
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
            />
          </div>
        )}

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
          Complete Registration
        </button>
      </form>
    </div>
  );
};

export default VendorSignUp;
