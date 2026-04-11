import React from 'react';

function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="logo text-gradient">AI TRAVEL</div>
      <ul className="nav-links">
        <li><a href="#explore">Explore</a></li>
        <li><a href="#trips">Trips</a></li>
        <li><a href="#profile">Profile</a></li>
      </ul>
      <div className="profile-icon">
        <div style={{
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: 'var(--gradient-main)'
        }}></div>
      </div>
    </nav>
  );
}

export default Navbar;
