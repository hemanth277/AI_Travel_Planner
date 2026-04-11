import React from 'react';

function Hero({ onSearch }) {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="hero">
      <div className="container">
        <h1 className="text-gradient">Where do you want to go?</h1>
        <p>Experience the future of travel planning with our AI assistant. Personalized itineraries in seconds.</p>
        
        <div className="search-container glass">
          <form className="search-bar" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Tokyo, Paris, Mars..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn-search">Explore Now</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Hero;
