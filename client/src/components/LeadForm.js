import React, { useState } from 'react';

function LeadForm({ onLeadAdded }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('Call');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!phone.trim()) {
      setError('Phone is required');
      return;
    }
    if (!/^\d{7,15}$/.test(phone.trim())) {
      setError('Phone must be 7-15 digits (numbers only)');
      return;
    }

    setLoading(true);
    try {
      await onLeadAdded({ name: name.trim(), phone: phone.trim(), source });
      setName('');
      setPhone('');
      setSource('Call');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-container">
      <h2>Add New Lead</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="source">Source</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Field">Field</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="btn-add">
          {loading ? 'Adding...' : 'Add Lead'}
        </button>
      </form>
    </div>
  );
}

export default LeadForm;
