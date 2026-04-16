import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      width: '100%', 
      backgroundColor: '#0a0a0a', 
      borderTop: '1px solid var(--border)', 
      padding: '4rem 2rem',
      marginTop: 'auto'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '3rem' 
      }}>
        {/* Brand Column */}
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>
            Open<span style={{ color: 'var(--primary)' }}>Space</span>
          </h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '300px', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Ghana's premier campus marketplace hub. Empowering student entrepreneurs and brands to reach thousands across every major university.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 style={{ color: 'var(--text-dark)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.9rem' }}>Platform</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-light)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = ''}>Active Events</li>
            <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = ''}>Vendor Success Stories</li>
            <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = ''}>Pricing & Packages</li>
            <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = ''}>Contact Partner Support</li>
          </ul>
        </div>

        {/* Campus Column */}
        <div>
          <h4 style={{ color: 'var(--text-dark)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.9rem' }}>National Presence</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-light)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>Legon, Accra</li>
            <li>KNUST, Kumasi</li>
            <li>UCC, Cape Coast</li>
            <li>Ashesi, Berekuso</li>
            <li>UDS, Wa / Tamale</li>
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h4 style={{ color: 'var(--text-dark)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.9rem' }}>Social Connect</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>Ig</div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>Tk</div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>Tw</div>
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '3rem auto 0 auto', 
        paddingTop: '2rem', 
        borderTop: '1px solid #27272a', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <p style={{ fontSize: '0.85rem', color: '#52525b' }}>© 2026 OpenSpace Network. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#52525b', cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ fontSize: '0.85rem', color: '#52525b', cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
