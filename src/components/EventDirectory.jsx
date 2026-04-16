import React, { useState } from 'react';

export const mockEvents = [
  {
    id: 'e7',
    title: 'Academic City Tech & Entrepreneurship Expo',
    date: 'September 15, 2026',
    location: 'Academic City University College, Haatso',
    stallsRemaining: 12,
    stallPrice: 'GHS 250 / day',
    footTraffic: '1,500+ Students',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    description: 'A cutting-edge showcase for engineering, robotics, and creative business ventures. Located at the state-of-the-art Academic City campus, this expo attracts young innovators and high-profile industry judges.',
    inclusions: [
      'High-speed fiber internet access',
      '1x Standard Booth with lighting',
      'Access to innovation networking session',
      'On-site branding opportunities'
    ]
  },
  {
    id: 'e1',
    title: 'Legon Republic Hall Week Market',
    date: 'April 20, 2026',
    location: 'University of Ghana, Legon',
    stallsRemaining: 15,
    stallPrice: 'GHS 200 / day',
    footTraffic: '5,000+ Students',
    image: '/legon-market.png',
    description: 'The biggest hall week celebration on the Legon campus. An explosive outdoor market focusing on local food, drinks, and thrifted fashion tailoring specifically to the student republic.',
    inclusions: [
      '1x Standard Canopy (10x10ft)',
      '2x Tables with plain covers',
      'Direct main pathway placement',
      'No loud bluetooth speakers allowed'
    ]
  },
  {
    id: 'e2',
    title: 'KNUST Tech & Innovation Fair',
    date: 'May 10, 2026',
    location: 'KNUST Great Hall Grounds',
    stallsRemaining: 8,
    stallPrice: 'GHS 350 / entire event',
    footTraffic: '3,000+ Students',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
    description: 'A premium indoor/outdoor showcase for tech gadgets, software startups, and creative engineering products attracting KNUST’s top technical talent.',
    inclusions: [
      'Premium indoor booth space',
      'Dedicated power socket access',
      'Mentorship network access',
      'Food not permitted for sale'
    ]
  },
  {
    id: 'e3',
    title: 'Ashesi Creative Arts & Food Festival',
    date: 'May 25, 2026',
    location: 'Ashesi University Courtyard',
    stallsRemaining: 4,
    stallPrice: 'GHS 150 / day',
    footTraffic: '1,200+ Students',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=1000',
    description: 'An intimate, highly aesthetic evening night market. Perfect for premium food brands, artisanal crafts, and sophisticated streetwear appealing to the Ashesi community.',
    inclusions: [
      'Evening string-light ambiance setup',
      '1x Table, no canopy needed',
      'Curated vendor selection (limited competition)'
    ]
  },
  {
    id: 'e4',
    title: 'UCC Coastal Market & Beach Fair',
    date: 'June 05, 2026',
    location: 'University of Cape Coast, Science Grounds',
    stallsRemaining: 20,
    stallPrice: 'GHS 120 / day',
    footTraffic: '4,500+ Students',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1000',
    description: 'A vibrant, breezy market right by the coast. UCC students flock here for snacks, beachwear, and books. Highly active foot traffic during the first week of June.',
    inclusions: [
      '1x Wooden market kiosk',
      'Daily waste management services',
      'Security patrol inclusive'
    ]
  },
  {
    id: 'e5',
    title: 'UDS Wa Food & Agro-Tech Fair',
    date: 'July 12, 2026',
    location: 'UDS Wa Campus Inner Circle',
    stallsRemaining: 10,
    stallPrice: 'GHS 100 / day',
    footTraffic: '2,500+ Students',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000',
    description: 'Specifically targeting the Upper West community. This fair is for food vendors and agro-innovation startups looking to scale their impact.',
    inclusions: [
      'Open space allocation (bring your own tent)',
      'Water point access',
      'Loud public address system allowed'
    ]
  },
  {
    id: 'e6',
    title: 'Central University Creative Pitch',
    date: 'August 02, 2026',
    location: 'Central University Miotso Campus',
    stallsRemaining: 6,
    stallPrice: 'GHS 180 / day',
    footTraffic: '3,000+ Students',
    image: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&q=80&w=1000',
    description: 'A sophisticated hub for creative brands. From boutique fashion to graphic design prints, Central students value high-end aesthetics and premium brands.',
    inclusions: [
      'Semi-permanent booth setup',
      'Wi-Fi voucher for vendors',
      'Feature in student radio promo'
    ]
  }
];

const EventDirectory = ({ activeVendor, onEventSelected }) => {
  return (
    <div style={{ marginTop: '2rem', width: '100%' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.2rem', color: 'var(--text-dark)' }}>Discover Campus Events</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-light)' }}>Find the perfect Ghanaian venue to showcase your brand.</p>
        </div>
      </div>

      <div className="events-grid">
        {mockEvents.map(event => {
          return (
            <div 
              key={event.id} 
              className="glass-panel event-card"
              onClick={() => onEventSelected(event)}
            >
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-details">
                <span className="event-tag">{event.stallsRemaining} stalls left</span>
                <h3 className="event-title">{event.title}</h3>
                
                <div className="event-meta">
                  <span>📅 {event.date}</span>
                  <span style={{ color: 'var(--primary)' }}>📍 {event.location}</span>
                </div>
                
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{event.description}</p>
                
                <button className="btn-primary">
                  View Setup & Price
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventDirectory;
