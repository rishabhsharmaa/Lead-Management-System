import React, { useState } from 'react';

function LeadList({ leads, onStatusChange, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSource, setFilterSource] = useState('All');

  // Apply filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSource = filterSource === 'All' || lead.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Interested': return 'status-interested';
      case 'Not Interested': return 'status-not-interested';
      case 'Converted': return 'status-converted';
      default: return '';
    }
  };

  return (
    <div className="lead-list-container">
      <h2>Leads ({filteredLeads.length})</h2>

      {/* Search & Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Statuses</option>
          <option value="Interested">Interested</option>
          <option value="Not Interested">Not Interested</option>
          <option value="Converted">Converted</option>
        </select>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Sources</option>
          <option value="Call">Call</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Field">Field</option>
        </select>
      </div>

      {filteredLeads.length === 0 ? (
        <p className="no-leads">
          {leads.length === 0
            ? 'No leads found. Add one above!'
            : 'No leads match your search/filter.'}
        </p>
      ) : (
        <div className="table-wrapper">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <span className="source-badge">{lead.source}</span>
                  </td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => onStatusChange(lead.id, e.target.value)}
                      className={`status-select ${getStatusClass(lead.status)}`}
                    >
                      <option value="Interested">Interested</option>
                      <option value="Not Interested">Not Interested</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LeadList;
