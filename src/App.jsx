import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VendorSignUp from './components/VendorSignUp';
import EventDirectory from './components/EventDirectory';
import EventDetails from './components/EventDetails';
import AdminLogin from './components/AdminLogin';
import PaymentVerification from './components/PaymentVerification';
import RejectionDialog from './components/RejectionDialog';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [activeVendor, setActiveVendor] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [applications, setApplications] = useState([]); 
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); 
  const [payingEvent, setPayingEvent] = useState(null); 
  const [rejectingAppId, setRejectingAppId] = useState(null);

  const handleSignUpComplete = (vendorData) => {
    setActiveVendor(vendorData);
    setShowSignUp(false); 
  };

  const handleApplyIntent = (event) => {
    if (!activeVendor) {
      setShowSignUp(true);
      return;
    }
    
    if (applications.find(a => a.eventId === event.id && a.vendorName === activeVendor.brandName)) {
      return alert('You have already applied (or are pending verification) for this event!');
    }

    setPayingEvent(event);
  };

  const handlePaymentSubmit = (txId) => {
    const newApp = {
      id: Math.random().toString(36).substr(2, 9),
      eventId: payingEvent.id,
      eventTitle: payingEvent.title,
      vendorName: activeVendor.brandName,
      vendorEmail: activeVendor.email,
      vendorType: activeVendor.type,
      studentId: activeVendor.studentId,
      transactionId: txId,
      status: 'pending',
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };
    
    setApplications(prev => [...prev, newApp]);
    setPayingEvent(null);
  };

  const updateApplicationStatus = (appId, newStatus, reason = null) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus, rejectionReason: reason } : app
    ));
    setRejectingAppId(null);
  };

  // --- MARKETPLACE VIEW ---
  const MarketplaceView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <div className="app-container" style={{ flex: 1, width: '100%' }}>
        <nav style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
           <h2 
              onClick={() => { setSelectedEvent(null); setShowSignUp(false); }} 
              style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)', cursor: 'pointer' }}
           >
              Open<span style={{ color: 'var(--primary)' }}>Space</span>
           </h2>
           
           <div>
             {!activeVendor ? (
               <button 
                 onClick={() => {
                   setSelectedEvent(null);
                   setShowSignUp(!showSignUp);
                 }} 
                 className="btn-outline"
               >
                 {showSignUp ? 'View Events' : 'Vendor Sign In'}
               </button>
             ) : (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 600, background: '#121212', color: 'var(--primary)', padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>Welcome, {activeVendor.brandName}</span>
                  <button 
                    onClick={() => {
                      setActiveVendor(null);
                      setSelectedEvent(null);
                      setShowSignUp(false);
                    }}
                    className="btn-outline"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                  >
                    Logout
                  </button>
                </div>
             )}
           </div>
        </nav>

        {showSignUp ? (
          <VendorSignUp onSignUpCompleted={handleSignUpComplete} />
        ) : selectedEvent ? (
          <EventDetails 
             event={selectedEvent} 
             onBack={() => setSelectedEvent(null)}
             onApply={() => handleApplyIntent(selectedEvent)}
             activeApplication={applications.find(a => a.eventId === selectedEvent.id && a.vendorName === activeVendor?.brandName)}
             activeVendor={activeVendor}
          />
        ) : (
          <EventDirectory 
             activeVendor={activeVendor} 
             onEventSelected={(event) => setSelectedEvent(event)} 
        />
        )}
      </div>

      {payingEvent && (
        <PaymentVerification 
          event={payingEvent} 
          price={activeVendor?.type === 'student' ? `GHS ${Math.floor(parseInt(payingEvent.stallPrice.split(' ')[1]) * 0.7)}` : payingEvent.stallPrice.split(' / ')[0]}
          onCancel={() => setPayingEvent(null)}
          onSubmit={handlePaymentSubmit}
        />
      )}
      <Footer />
    </div>
  );

  // --- ADMIN VIEW ---
  const AdminView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <div className="app-container" style={{ flex: 1, width: '100%', padding: '2rem' }}>
        {!isAdminAuthenticated ? (
          <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
        ) : (
          <div className="animate-fade-in" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem' }}>Admin Control Panel</h1>
                <p style={{ color: 'var(--text-light)' }}>Review and approve vendor stall applications.</p>
              </div>
              <button 
                onClick={() => setIsAdminAuthenticated(false)}
                className="btn-outline"
                style={{ color: '#ef4444', borderColor: '#ef4444' }}
              >
                Logout Admin
              </button>
            </div>
          
            {/* Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Total Apps</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{applications.length}</p>
              </div>
              <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Pending</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{applications.filter(a => a.status === 'pending').length}</p>
              </div>
              <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Approved</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>{applications.filter(a => a.status === 'approved').length}</p>
              </div>
            </div>

            {/* Applications List */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#18181b', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1.2rem' }}>BRAND / TYPE</th>
                    <th style={{ padding: '1.2rem' }}>EVENT</th>
                    <th style={{ padding: '1.2rem' }}>PAYMENT PROOF</th>
                    <th style={{ padding: '1.2rem' }}>STATUS</th>
                    <th style={{ padding: '1.2rem' }}>DATE</th>
                    <th style={{ padding: '1.2rem' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr><td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>No applications to review.</td></tr>
                  ) : (
                    applications.map(app => (
                      <tr key={app.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#18181b'} onMouseOut={e => e.currentTarget.style.backgroundColor = ''}>
                        <td style={{ padding: '1.2rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div>
                              <p style={{ fontWeight: 700 }}>{app.brandName || app.vendorName}</p>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{app.vendorEmail}</p>
                            </div>
                            <span style={{ 
                              padding: '0.2rem 0.5rem', 
                              borderRadius: '4px', 
                              fontSize: '0.65rem', 
                              fontWeight: 800, 
                              background: app.vendorType === 'student' ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)',
                              color: app.vendorType === 'student' ? 'var(--primary)' : 'var(--text-light)',
                              border: '1px solid' + (app.vendorType === 'student' ? 'var(--primary)' : 'var(--border)')
                            }}>
                              {app.vendorType === 'student' ? 'STUDENT' : 'EXTERNAL'}
                            </span>
                          </div>
                          {app.studentId && (
                            <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.4rem', fontWeight: 600 }}>ID: {app.studentId}</p>
                          )}
                        </td>
                        <td style={{ padding: '1.2rem', color: 'var(--text-light)' }}>{app.eventTitle}</td>
                        <td style={{ padding: '1.2rem' }}>
                          <div style={{ background: '#121212', padding: '0.5rem', borderRadius: '6px', border: '1px solid #27272a', display: 'inline-block' }}>
                            <code style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{app.transactionId}</code>
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem' }}>
                          <span style={{ 
                            padding: '0.4rem 0.8rem', 
                            borderRadius: '20px', 
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            textTransform: 'uppercase',
                            backgroundColor: app.status === 'pending' ? 'rgba(249,115,22,0.1)' : app.status === 'approved' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                            color: app.status === 'pending' ? 'var(--primary)' : app.status === 'approved' ? 'var(--success)' : '#ef4444'
                          }}>
                            {app.status}
                          </span>
                        </td>
                        <td style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>{app.timestamp}</td>
                        <td style={{ padding: '1.2rem' }}>
                          {app.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button onClick={() => updateApplicationStatus(app.id, 'approved')} style={{ padding: '0.4rem 0.8rem', background: 'var(--success)', border: 'none', color: 'white', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Approve</button>
                              <button onClick={() => setRejectingAppId(app.id)} style={{ padding: '0.4rem 0.8rem', background: '#3f3f46', border: 'none', color: 'white', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {rejectingAppId && (
        <RejectionDialog 
          app={applications.find(a => a.id === rejectingAppId)}
          onConfirm={(id, reason) => updateApplicationStatus(id, 'rejected', reason)}
          onCancel={() => setRejectingAppId(null)}
        />
      )}
      <Footer />
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketplaceView />} />
        <Route path="/admin" element={<AdminView />} />
        {/* Fallback to Marketplace */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
