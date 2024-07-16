// api.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Endpoint to fetch data based on ID
app.get('/api/province/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT anggaranpkb, realisasipkb, anggaranbbnkb, realisasbbnkb 
      FROM provinsi 
      WHERE id = $1`, [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Province not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
