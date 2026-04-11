import React from 'react';

function WorldMap() {
  return (
    <section className="map-section container">
      <h2 className="section-title">Global Exploration</h2>
      <div className="map-container glass">
        <div className="map-glow" style={{ top: '20%', left: '30%' }}></div>
        <div className="map-glow" style={{ bottom: '30%', right: '25%' }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            Interactive Map Visualization Component
          </p>
          <div style={{
            marginTop: '1rem',
            padding: '1rem 2rem',
            border: '1px solid var(--primary)',
            borderRadius: '100px',
            display: 'inline-block',
            color: 'var(--primary)'
          }}>
            Explore Destinations
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorldMap;
