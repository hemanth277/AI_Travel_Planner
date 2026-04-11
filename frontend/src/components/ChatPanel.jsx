import React, { useState } from 'react';

function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI travel assistant. Where would you like to go today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    // Placeholder for AI logic
  };

  return (
    <div className="chat-panel glass-card animate-fade-in">
      <div className="chat-header">
        <h3>AI Assistant</h3>
        <button className="close-btn" onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      </div>
      <div className="chat-messages" style={{ height: '350px', overflowY: 'auto', padding: '1rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: '1rem',
            textAlign: m.role === 'user' ? 'right' : 'left'
          }}>
            <p style={{
              display: 'inline-block',
              padding: '0.8rem 1.2rem',
              borderRadius: '1.2rem',
              background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              fontSize: '0.9rem'
            }}>
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          placeholder="Ask me anything..." 
          className="glass"
          style={{ padding: '0.8rem', borderRadius: '100px', flex: 1, border: '1px solid var(--card-border)', color: 'white' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-search" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>Send</button>
      </form>
    </div>
  );
}

export default ChatPanel;
