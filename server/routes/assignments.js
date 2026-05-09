const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT assignments.id, assets.name AS asset_name, job_sites.name AS site_name, assignments.assigned_date
      FROM assignments
      JOIN assets ON assignments.asset_id = assets.id
      JOIN job_sites ON assignments.job_site_id = job_sites.id
      WHERE assignments.returned_date IS NULL
      ORDER BY assignments.assigned_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an assignment
router.post('/', async (req, res) => {
  const { asset_id, job_site_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO assignments (asset_id, job_site_id) VALUES ($1, $2) RETURNING *',
      [asset_id, job_site_id]
    );
    await pool.query(
      'UPDATE assets SET status = $1 WHERE id = $2',
      ['deployed', asset_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Return an asset
router.patch('/:id/return', async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await pool.query(
      'UPDATE assignments SET returned_date = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    await pool.query(
      'UPDATE assets SET status = $1 WHERE id = $2',
      ['available', assignment.rows[0].asset_id]
    );
    res.json({ message: 'Asset returned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;