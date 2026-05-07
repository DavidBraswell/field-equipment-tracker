const express = require('express');
const router = express.Router();
const pool = require('../db');

// get the table of jobsites
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM job_sites ORDER BY created_at DESC');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// create a jobsite
router.post('/', async (req, res) => {
    const { name, location } = req.body;
    try {
        const result = await pool.query('INSERT INTO job_sites (name, location) VALUES ($1, $2) RETURNING *', [name, location]);
        res.json(result.rows[0]);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// delete a jobsite

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM job_sites WHERE id = $1', [id]);
        res.json({ message: 'job site deleted'});
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;