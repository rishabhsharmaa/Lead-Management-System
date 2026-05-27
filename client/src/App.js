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

      // SAFETY CHECK: Make sure the backend actually sent an array
      if (Array.isArray(res.data)) {
        setLeads(res.data);
        setError('');
      } else {
        // If it's not an array, throw an error to trigger the catch block
        throw new Error('Invalid data format from server');
      }

    } catch (err) {
      setLeads([]); // Ensure leads stays an array so Dashboard doesn't crash
      setError('Failed to fetch leads. Check your backend/database connection.');
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
