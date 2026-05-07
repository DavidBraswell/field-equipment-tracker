const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an asset
router.post('/', async (req, res) => {
  const { name, category, serial_number } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO assets (name, category, serial_number) VALUES ($1, $2, $3) RETURNING *',
      [name, category, serial_number]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an asset
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM assets WHERE id = $1', [id]);
    res.json({ message: 'Asset deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;