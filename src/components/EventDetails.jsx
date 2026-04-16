import React from 'react';

const EventDetails = ({ event, onBack, onApply, activeApplication, activeVendor }) => {
  const applicationStatus = activeApplication?.status;
  const basePriceStr = event.stallPrice.split(' ')[1];
  const basePrice = parseInt(basePriceStr);
  const isStudent = activeVendor?.type === 'student';
  const studentPrice = Math.floor(basePrice * 0.7);
  
  const currentPrice = isStudent ? `GHS ${studentPrice}` : `GHS ${basePrice}`;
  const priceSuffix = event.stallPrice.split(' / ')[1];

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '900px', margin: '2rem auto', paddingBottom: '4rem' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, padding: 0 }}
      >
        ← Back to Events
      </button>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 15px 30px rgba(0,0,0,0.5)' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
        
        <div style={{ padding: '2.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="event-tag">{event.stallsRemaining} stalls remaining</span>
            {isStudent && (
              <span style={{ background: 'rgba(249,115,22,0.1)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, border: '1px solid var(--primary)' }}>
                30% STUDENT DISCOUNT APPLIED
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)', lineHeight: 1.1 }}>{event.title}</h1>
          <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '2.5rem' }}>📍 {event.location}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem', padding: '1.5rem', background: '#121212', borderRadius: '12px', border: '1px solid #27272a' }}>
             <div>
               <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Stall Pitch Price</p>
               <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                 <p style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--success)' }}>{currentPrice} / {priceSuffix}</p>
                 {isStudent && <p style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: 'var(--text-light)' }}>GHS {basePrice}</p>}
               </div>
             </div>
             <div>
               <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Est. Foot Traffic</p>
               <p style={{ fontWeight: 800, fontSize: '1.3rem' }}>{event.footTraffic}</p>
             </div>
             <div>
               <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>MoMo Merchant Number</p>
               <p style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary)' }}>0123456789</p>
             </div>
          </div>

          <div style={{ marginBottom: '2.5rem', padding: '1.5rem', border: '1px solid #27272a', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.05)' }}>
            <h3 style={{ marginBottom: '0.8rem', fontSize: '1.2rem', color: 'var(--text-dark)' }}>Payment Information</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              To secure your stall, please pay directly to our official MoMo Merchant Number below:
            </p>
            <div style={{ color: 'var(--text-dark)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p>1. Transfer the amount to <strong>0123456789</strong> (Merchant)</p>
              <p>2. Use your <strong>Brand Name</strong> as the reference</p>
              <p>3. Confirm the payment of <strong>{currentPrice}</strong></p>
              <p>4. Once paid, click the button below to notify our admin</p>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Vendor Inclusions & Rules</h3>
            <ul style={{ listStylePosition: 'inside', color: 'var(--text-light)', lineHeight: '2.2', marginBottom: '1.5rem', marginLeft: '0.5rem' }}>
               {event.inclusions.map((item, i) => (
                  <li key={i}>{item}</li>
               ))}
            </ul>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>{event.description}</p>
          </div>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            {applicationStatus === 'approved' ? (
               <button className="btn-success" style={{ padding: '1.2rem', fontSize: '1.1rem', width: '100%' }}>✓ Stall Secured & Confirmed</button>
            ) : applicationStatus === 'pending' ? (
               <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                  <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>⏳ Awaiting Verification</p>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Our admin is currently reviewing your payment proof. You will be notified once confirmed.</p>
               </div>
            ) : applicationStatus === 'rejected' ? (
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)', textAlign: 'center' }}>
                 <p style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem' }}>❌ Application Rejected</p>
                 <div style={{ background: '#121212', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #ef4444', textAlign: 'left', marginBottom: '1.5rem' }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase' }}>Admin Message:</p>
                    <p style={{ color: 'white', lineHeight: '1.6', fontStyle: 'italic' }}>"{activeApplication.rejectionReason}"</p>
                 </div>
                 <button onClick={() => onApply(event.id)} className="btn-outline" style={{ width: '100%' }}>Re-Apply with Correct Information</button>
              </div>
            ) : (
               <button className="btn-primary" onClick={() => onApply(event.id)} style={{ padding: '1.2rem', fontSize: '1.1rem', background: 'var(--primary)', color: '#fff', width: '100%' }}>Secure Your Stall Now</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
