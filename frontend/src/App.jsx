import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Form from './components/Form';
import Result from './components/Result';
import DestinationCard from './components/DestinationCard';
import WorldMap from './components/WorldMap';
import ChatPanel from './components/ChatPanel';

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const data = await response.json();
      setItinerary(data);
      // Smooth scroll to results
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
      // Scroll to error
      setTimeout(() => {
        const errorEl = document.getElementById('error-message');
        if (errorEl) errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const featuredDestinations = [
    { name: 'Tokyo, Japan', rating: '4.9', tags: ['Futuristic'], imgUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
    { name: 'Paris, France', rating: '4.8', tags: ['Culture'], imgUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
    { name: 'Bali, Indonesia', rating: '4.7', tags: ['Nature'], imgUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  ];

  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="app-root">
      <Navbar />
      <Hero onSearch={(q) => handleGenerate({ destination: q, days: 5, budget: 'Standard', travelers: 'Solo', interests: 'Everything' })} />
      
      <section className="container" id="explore" style={{ paddingBottom: '100px' }}>
        <h2 className="section-title">Trending Destinations</h2>
        <div className="grid">
          {featuredDestinations.map((dest, i) => (
            <DestinationCard key={i} {...dest} />
          ))}
        </div>
      </section>

      <div className="container" id="trips" style={{ paddingBottom: '100px' }}>
        <h2 className="section-title">Customize Your Journey</h2>
        <Form onGenerate={handleGenerate} loading={loading} />
      </div>

      <WorldMap />

      {itinerary && <Result itinerary={itinerary} />}
      
      {error && (
        <div className="container" id="error-message" style={{ textAlign: 'center', color: 'var(--accent)', padding: '4rem 2rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', display: 'inline-block' }}>
            <p style={{ fontSize: '1.2rem' }}>Error: {error}</p>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Please try again in a moment.</p>
          </div>
        </div>
      )}

      {isChatOpen ? (
        <ChatPanel onClose={() => setIsChatOpen(false)} />
      ) : (
        <button 
          className="btn-search animate-fade-in" 
          onClick={() => setIsChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1001,
            padding: '1rem 2rem',
            boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)'
          }}
        >
          💬 Chat with AI
        </button>
      )}
      
      <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
        <p style={{ color: 'var(--text-muted)' }}>© 2026 AI TRAVEL PLANNER. THE FUTURE OF JOURNEY.</p>
      </footer>
    </div>
  );
}

export default App;
