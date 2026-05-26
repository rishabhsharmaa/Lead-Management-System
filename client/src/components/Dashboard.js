import React from 'react';

function Dashboard({ leads }) {
  const total = leads.length;
  const interested = leads.filter((l) => l.status === 'Interested').length;
  const notInterested = leads.filter((l) => l.status === 'Not Interested').length;
  const converted = leads.filter((l) => l.status === 'Converted').length;

  const sourceCall = leads.filter((l) => l.source === 'Call').length;
  const sourceWhatsApp = leads.filter((l) => l.source === 'WhatsApp').length;
  const sourceField = leads.filter((l) => l.source === 'Field').length;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dash-card card-total">
          <span className="dash-number">{total}</span>
          <span className="dash-label">Total Leads</span>
        </div>
        <div className="dash-card card-interested">
          <span className="dash-number">{interested}</span>
          <span className="dash-label">Interested</span>
        </div>
        <div className="dash-card card-not-interested">
          <span className="dash-number">{notInterested}</span>
          <span className="dash-label">Not Interested</span>
        </div>
        <div className="dash-card card-converted">
          <span className="dash-number">{converted}</span>
          <span className="dash-label">Converted</span>
        </div>
      </div>
      <div className="dashboard-source">
        <h3>Leads by Source</h3>
        <div className="source-bars">
          <div className="source-row">
            <span className="source-name">Call</span>
            <div className="bar-track">
              <div
                className="bar-fill bar-call"
                style={{ width: total ? `${(sourceCall / total) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="source-count">{sourceCall}</span>
          </div>
          <div className="source-row">
            <span className="source-name">WhatsApp</span>
            <div className="bar-track">
              <div
                className="bar-fill bar-whatsapp"
                style={{ width: total ? `${(sourceWhatsApp / total) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="source-count">{sourceWhatsApp}</span>
          </div>
          <div className="source-row">
            <span className="source-name">Field</span>
            <div className="bar-track">
              <div
                className="bar-fill bar-field"
                style={{ width: total ? `${(sourceField / total) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="source-count">{sourceField}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
