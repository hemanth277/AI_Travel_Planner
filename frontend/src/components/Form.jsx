import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Send } from 'lucide-react';

function Form({ onGenerate, loading }) {
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: 'Standard',
    travelers: 'Solo',
    interests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="glass-card form-container animate-fade-in">
      <form onSubmit={handleSubmit} className="premium-form">
        <div className="form-sections">
          <div className="input-field">
            <label><MapPin size={16} /> Destination</label>
            <div className="input-wrapper">
              <input 
                id="destination" 
                type="text" 
                placeholder="Where to?" 
                value={formData.destination} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="input-field">
            <label><Calendar size={16} /> Duration</label>
            <div className="input-wrapper">
              <input 
                id="days" 
                type="number" 
                placeholder="Days" 
                value={formData.days} 
                onChange={handleChange} 
                min="1" 
                max="100" 
                required 
              />
            </div>
          </div>

          <div className="input-field">
            <label><DollarSign size={16} /> Budget</label>
            <div className="input-wrapper">
              <select id="budget" value={formData.budget} onChange={handleChange}>
                <option>Economy</option>
                <option>Standard</option>
                <option>Luxury</option>
              </select>
            </div>
          </div>

          <div className="input-field">
            <label><Users size={16} /> Travelers</label>
            <div className="input-wrapper">
              <select id="travelers" value={formData.travelers} onChange={handleChange}>
                <option>Solo</option>
                <option>Couple</option>
                <option>Family</option>
                <option>Group</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-sections" style={{ marginTop: '1.5rem' }}>
          <div className="input-field" style={{ flex: '1' }}>
            <label>✨ Interests & Preferences</label>
            <div className="input-wrapper">
              <input 
                id="interests" 
                type="text" 
                placeholder="e.g. History, Street Food, Hiking, Photography..." 
                value={formData.interests} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="btn-generate" disabled={loading} style={{ width: '100%', maxWidth: '400px', justifyContent: 'center' }}>
            {loading ? (
              <div className="loader-small"></div>
            ) : (
              <>
                Generate Plan <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
