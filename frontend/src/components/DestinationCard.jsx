import React from 'react';

function DestinationCard({ name, rating, tags, imgUrl }) {
  return (
    <div className="glass-card destination-card">
      <img src={imgUrl} alt={name} className="card-img" />
      <div className="card-content">
        <div className="card-tag">{tags[0]}</div>
        <h3>{name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          ⭐ {rating} · Explore the beauty of {name}
        </p>
      </div>
    </div>
  );
}

export default DestinationCard;
