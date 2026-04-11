import React from 'react';

function Result({ itinerary }) {
  if (!itinerary) return null;

  const details = itinerary.destinationDetails;
  // images.unsplash.com photo IDs for guaranteed high-quality visuals
  const imageMap = {
    'rome': '1552832230-c01d21c002f1',
    'paris': '1502602898657-3e91760cbb34',
    'london': '1513635269975-59663e0ac1ad',
    'tokyo': '1540959733332-eab4deabeeaf',
    'bali': '1537996194471-e657df975ab4',
    'new york': '1496442226666-8d4d0e62e6e9',
    'andhra': '1589793907148-3066324ac588', 
    'vizag': '1589793907148-3066324ac588',
    'food': '1504674900247-0877df9cc836',
    'nature': '1441974231531-c6227db76b6e',
    'history': '1552832230-c01d21c002f1',
    'beach': '1507525428034-b723cf961d3e',
    'mountain': '1464822759023-fed622ff2c3b'
  };

  const getImg = (keyword, width = 1200) => {
    const key = keyword?.toLowerCase().trim() || 'travel';
    // Find matching key in map
    const entry = Object.keys(imageMap).find(k => key.includes(k) || k.includes(key));
    const id = imageMap[entry] || imageMap['nature']; // high-quality generic fallback
    return `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;
  };

  const destinationName = itinerary.tripOverview?.match(/journey through (.*?)\./)?.[1] || 'the Destination';
  const mainImageUrl = getImg(destinationName);
  const sideImageUrl1 = getImg(details?.highlights?.[0], 600);
  const sideImageUrl2 = getImg(details?.highlights?.[1], 600);

  return (
    <div className="itinerary-section container animate-fade-in" style={{ marginTop: '5rem', marginBottom: '10rem' }}>
      
      {/* Destination Hero Preview */}
      <div className="destination-preview" style={{ marginBottom: '6rem' }}>
        <div className="preview-header">
          <div className="preview-main-img glass">
            <img src={mainImageUrl} alt="Destination" />
            <div className="preview-overlay">
              <h2 className="section-title" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Explore {destinationName}</h2>
              <p className="description-text">{details?.description}</p>
            </div>
          </div>
          <div className="preview-side-column">
            <div className="side-img glass"><img src={sideImageUrl1} alt="Highlight 1" /></div>
            <div className="side-img glass"><img src={sideImageUrl2} alt="Highlight 2" /></div>
          </div>
        </div>
        
        <div className="highlights-bar glass">
          {details?.highlights?.map((h, i) => (
            <div key={i} className="highlight-item">
              <span className="dot"></span>
              {h}
            </div>
          ))}
        </div>
      </div>

      <h2 className="section-title">Your Curated Itinerary</h2>
      
      <div className="glass-card overview-card" style={{ marginBottom: '4rem', padding: '3rem' }}>
        <h3 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Adventure Overview</h3>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{itinerary.tripOverview}</p>
      </div>

      <div className="grid">
        {itinerary.dailyItinerary.map((day) => (
          <div key={day.day} className="glass-card day-card" style={{ padding: '2.5rem' }}>
            <div className="card-tag">Day {day.day}</div>
            <h3 style={{ margin: '1rem 0 2rem' }}>Exploration Guide</h3>
            <div className="activities">
              {day.activities.map((act, i) => (
                <div key={i} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold', minWidth: '70px' }}>{act.time}</div>
                  <p style={{ color: 'var(--text-muted)' }}>{act.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Result;
