import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const getLeads = () => API.get('/leads');
export const addLead = (data) => API.post('/leads', data);
export const updateLeadStatus = (id, status) => API.patch(`/leads/${id}`, { status });
export const deleteLead = (id) => API.delete(`/leads/${id}`);
