import React, { useState, useEffect } from 'react';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import { getLeads, addLead, updateLeadStatus, deleteLead } from './services/api';
import './App.css';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch leads. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async (leadData) => {
    await addLead(leadData);
    fetchLeads();
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateLeadStatus(id, status);
      fetchLeads();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(id);
      fetchLeads();
    } catch (err) {
      setError('Failed to delete lead');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lead Management System</h1>
      </header>
      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}
        <LeadForm onLeadAdded={handleAddLead} />
        <Dashboard leads={leads} />
        {loading ? (
          <p className="loading">Loading leads...</p>
        ) : (
          <LeadList
            leads={leads}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
