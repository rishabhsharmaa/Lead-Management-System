const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/leads - Get all leads
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching leads:', err.message);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// POST /api/leads - Add a new lead
router.post('/', async (req, res) => {
  const { name, phone, source } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ error: 'Phone is required' });
  }
  if (!/^\d{7,15}$/.test(phone.trim())) {
    return res.status(400).json({ error: 'Phone must be 7-15 digits' });
  }
  const validSources = ['Call', 'WhatsApp', 'Field'];
  if (!source || !validSources.includes(source)) {
    return res.status(400).json({ error: 'Source must be Call, WhatsApp, or Field' });
  }

  try {
    const result = await db.query(
      'INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), phone.trim(), source]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding lead:', err.message);
    res.status(500).json({ error: 'Failed to add lead' });
  }
});

// PATCH /api/leads/:id - Update lead status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Interested', 'Not Interested', 'Converted'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status must be Interested, Not Interested, or Converted' });
  }

  try {
    const result = await db.query(
      'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating lead:', err.message);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE /api/leads/:id - Delete a lead
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM leads WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    console.error('Error deleting lead:', err.message);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

module.exports = router;
