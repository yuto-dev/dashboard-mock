// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3001;

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

// Enable CORS
app.use(cors({
origin: allowedOrigins,
methods: 'GET,POST,PUT,DELETE',
allowedHeaders: 'Content-Type, Authorization'
}));

app.options('*', cors());

// app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// WHERE provinsiid = $1 AND kabupatenid = $2`, [provinceId, kabupatenId]);
// API endpoint

app.get('/api/provinces', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT DISTINCT kode_prop, nama_daerah 
          FROM daerah_master
          WHERE is_prop = 'TRUE'
          ORDER BY kode_prop ASC
      `);
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching provinces:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/kabupaten/:kodeProp', async (req, res) => {
  const { kodeProp } = req.params;

  // Use the correct comparison operator
  const query = `SELECT kode_kab, nama_daerah FROM daerah_master WHERE kode_prop = $1`; // Use '=' instead of just using 'kode_prop $1'
  
  try {
      const { rows } = await pool.query(query, [kodeProp]);
      res.json(rows);
  } catch (error) {
      console.error('Error fetching kabupatens:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 1 Jumlah Kendaraan Bermotor
app.get('/api/1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

app.get('/api/1detail/:kode_prop/:kode_kab', async (req, res) => {
    const { kode_prop, kode_kab } = req.params;

    let query;
    let queryParams = [];

    if (kode_prop === "0") {
        query = `
            SELECT jenis_kendaraan, jenis_kepemilikan, SUM(jumlah_kendaraan) AS total_jumlah
            FROM formatpkbrekap
            WHERE bulan = 12 AND tahun = 2024
            GROUP BY jenis_kendaraan, jenis_kepemilikan
            ORDER BY jenis_kendaraan, jenis_kepemilikan;
        `;
    } else if (kode_kab === "0") {
        query = `
            SELECT jenis_kendaraan, jenis_kepemilikan, SUM(jumlah_kendaraan) AS total_jumlah
            FROM formatpkbrekap
            WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
            GROUP BY jenis_kendaraan, jenis_kepemilikan
            ORDER BY jenis_kendaraan, jenis_kepemilikan;
        `;
        queryParams = [kode_prop]; // Only add kode_prop
    } else {
        query = `
            SELECT jenis_kendaraan, jenis_kepemilikan, SUM(jumlah_kendaraan) AS total_jumlah
            FROM formatpkbrekap
            WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
            GROUP BY jenis_kendaraan, jenis_kepemilikan
            ORDER BY jenis_kendaraan, jenis_kepemilikan;
        `;
        queryParams = [kode_prop, kode_kab]; // Add both parameters
    }

    try {
        const result = await pool.query(query, queryParams); // Execute the query with parameters

        // Transforming the result into desired JSON format
        const responseData = {};
        result.rows.forEach(row => {
            if (!responseData[row.jenis_kendaraan]) {
                responseData[row.jenis_kendaraan] = {};
            }
            responseData[row.jenis_kendaraan][row.jenis_kepemilikan] = parseInt(row.total_jumlah); // Ensure the value is a number
        });

        res.json(responseData); // Sending JSON response
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Server error');
    }
});

// 3 Jumlah Kendaraan Bermotor Yang Menunggak Selama 5 Tahun
app.get('/api/3/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_menunggak_5tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_menunggak_5tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_menunggak_5tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 4 Jumlah Kendaraan Bermotor Yang Menunggak Selama 7 Tahun
app.get('/api/4/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_menunggak_7tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_menunggak_7tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_menunggak_7tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 5 Jumlah Kendaraan Bermotor Yang Membayar Pajak Tahun Berjalan
app.get('/api/5/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 6 Jumlah Kendaraan Bermotor Baru
app.get('/api/6/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;

  let query2024;
  let query2023;
  let queryParams = [];

  if (kode_prop === "0") {
      query2024 = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      query2023 = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query2024 = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      query2023 = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop];
  } else {
      query2024 = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      query2023 = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab];
  }

  try {
      const result2024 = await pool.query(query2024, queryParams);
      const result2023 = await pool.query(query2023, queryParams);

      const responseData = {};
      
      result2024.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
      });

      result2023.rows.forEach(row => {
          if (responseData[row.jenis_kendaraan] !== undefined) {
              responseData[row.jenis_kendaraan] -= parseInt(row.total_jumlah);
          } else {
              responseData[row.jenis_kendaraan] = -parseInt(row.total_jumlah);
          }
      });
      

      res.json(responseData);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 7 Nominal Kendaraan Bermotor Yang Menunggak Selama 5 Tahun (Dalam Rupiah)
app.get('/api/7/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_5tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_5tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_5tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 8 Nominal Kendaraan Bermotor Yang Menunggak Selama 7 Tahun (Dalam Rupiah)
app.get('/api/8/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_7tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_7tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_7tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 9 Nominal Kendaraan Bermotor Yang Menunggak Selama 1 Tahun (Dalam Rupiah)
app.get('/api/9/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_1tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_1tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_menunggak_1tahun) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 10.1 Jumlah Kendaraan Bermotor Yang Membayar Pajak Secara Online
app.get('/api/10-1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 10.2 Jumlah Kendaraan Bermotor Yang Membayar Pajak Secara Offline
app.get('/api/10-2/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 11.1 Nominal Kendaraan Bermotor Yang Membayar Pajak Secara Online (Dalam Rupiah)
app.get('/api/11-1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 11.2 Nominal Kendaraan Bermotor Yang Membayar Pajak Secara Offline (Dalam Rupiah)
app.get('/api/11-2/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2024
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 12.1 Jumlah Kendaraan Bermotor 1 Tahun Sebelum
app.get('/api/12-1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 12.2 Jumlah Kendaraan Bermotor 2 Tahun Sebelum
app.get('/api/12-2/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 12.3 Jumlah Kendaraan Bermotor 3 Tahun Sebelum
app.get('/api/12-3/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 13.1 Jumlah Kendaraan Bermotor Yang Membayar 1 Tahun Sebelum
app.get('/api/13-1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 13.2 Jumlah Kendaraan Bermotor Yang Membayar 2 Tahun Sebelum
app.get('/api/13-2/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 13.3 Jumlah Kendaraan Bermotor Yang Membayar 3 Tahun Sebelum
app.get('/api/13-3/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 14.1 Jumlah Kendaraan Bermotor Yang Tidak Membayar 1 Tahun Sebelum
app.get('/api/14-1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;

  let queryTotal;
  let queryBayar;
  let queryParams = [];

  if (kode_prop === "0") {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop];
  } else {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab];
  }

  try {
      const resultTotal = await pool.query(queryTotal, queryParams);
      const resultBayar = await pool.query(queryBayar, queryParams);

      const responseData = {};
      
      resultTotal.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
      });

      resultBayar.rows.forEach(row => {
          if (responseData[row.jenis_kendaraan] !== undefined) {
              responseData[row.jenis_kendaraan] -= parseInt(row.total_jumlah);
          } else {
              responseData[row.jenis_kendaraan] = -parseInt(row.total_jumlah);
          }
      });
      

      res.json(responseData);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 14.2 Jumlah Kendaraan Bermotor Yang Tidak Membayar 2 Tahun Sebelum
app.get('/api/14-2/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;

  let queryTotal;
  let queryBayar;
  let queryParams = [];

  if (kode_prop === "0") {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop];
  } else {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab];
  }

  try {
      const resultTotal = await pool.query(queryTotal, queryParams);
      const resultBayar = await pool.query(queryBayar, queryParams);

      const responseData = {};
      
      resultTotal.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
      });

      resultBayar.rows.forEach(row => {
          if (responseData[row.jenis_kendaraan] !== undefined) {
              responseData[row.jenis_kendaraan] -= parseInt(row.total_jumlah);
          } else {
              responseData[row.jenis_kendaraan] = -parseInt(row.total_jumlah);
          }
      });
      

      res.json(responseData);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 14.3 Jumlah Kendaraan Bermotor Yang Tidak Membayar 3 Tahun Sebelum
app.get('/api/14-3/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;

  let queryTotal;
  let queryBayar;
  let queryParams = [];

  if (kode_prop === "0") {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop];
  } else {
      queryTotal = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryBayar = `
          SELECT jenis_kendaraan, SUM(jumlah_kendaraan_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab];
  }

  try {
      const resultTotal = await pool.query(queryTotal, queryParams);
      const resultBayar = await pool.query(queryBayar, queryParams);

      const responseData = {};
      
      resultTotal.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
      });

      resultBayar.rows.forEach(row => {
          if (responseData[row.jenis_kendaraan] !== undefined) {
              responseData[row.jenis_kendaraan] -= parseInt(row.total_jumlah);
          } else {
              responseData[row.jenis_kendaraan] = -parseInt(row.total_jumlah);
          }
      });
      

      res.json(responseData);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 15.1 Nominal Kendaraan Bermotor Yang Membayar 1 Tahun Sebelum (Dalam Rupiah)
app.get('/api/15-1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;

  let queryOnline;
  let queryOffline;
  let queryParams = [];

  if (kode_prop === "0") {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop];
  } else {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab];
  }

  try {
      const resultTotal = await pool.query(queryOnline, queryParams);
      const resultBayar = await pool.query(queryOffline, queryParams);

      const responseData = {};
      
      resultTotal.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
      });

      resultBayar.rows.forEach(row => {
          if (responseData[row.jenis_kendaraan] !== undefined) {
              responseData[row.jenis_kendaraan] += parseInt(row.total_jumlah);
          } else {
              responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
          }
      });

      res.json(responseData);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 15.2 Nominal Kendaraan Bermotor Yang Membayar 2 Tahun Sebelum (Dalam Rupiah)
app.get('/api/15-2/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;

  let queryOnline;
  let queryOffline;
  let queryParams = [];

  if (kode_prop === "0") {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop];
  } else {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab];
  }

  try {
      const resultTotal = await pool.query(queryOnline, queryParams);
      const resultBayar = await pool.query(queryOffline, queryParams);

      const responseData = {};
      
      resultTotal.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
      });

      resultBayar.rows.forEach(row => {
          if (responseData[row.jenis_kendaraan] !== undefined) {
              responseData[row.jenis_kendaraan] += parseInt(row.total_jumlah);
          } else {
              responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
          }
      });

      res.json(responseData);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 15.3 Nominal Kendaraan Bermotor Yang Membayar 3 Tahun Sebelum (Dalam Rupiah)
app.get('/api/15-3/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;

  let queryOnline;
  let queryOffline;
  let queryParams = [];

  if (kode_prop === "0") {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop];
  } else {
      queryOnline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_online) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryOffline = `
          SELECT jenis_kendaraan, SUM(nominal_pembayaran_offline) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab];
  }

  try {
      const resultTotal = await pool.query(queryOnline, queryParams);
      const resultBayar = await pool.query(queryOffline, queryParams);

      const responseData = {};
      
      resultTotal.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
      });

      resultBayar.rows.forEach(row => {
          if (responseData[row.jenis_kendaraan] !== undefined) {
              responseData[row.jenis_kendaraan] += parseInt(row.total_jumlah);
          } else {
              responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah);
          }
      });

      res.json(responseData);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 16.1 Nominal Kendaraan Bermotor Yang Tidak Membayar 1 Tahun Sebelum (Dalam Rupiah) 
app.get('/api/16-1/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2023
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 16.2 Nominal Kendaraan Bermotor Yang Tidak Membayar 2 Tahun Sebelum (Dalam Rupiah)
app.get('/api/16-2/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2022
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// 16.3 Nominal Kendaraan Bermotor Yang Tidak Membayar 3 Tahun Sebelum (Dalam Rupiah)
app.get('/api/16-3/:kode_prop/:kode_kab', async (req, res) => {
  const { kode_prop, kode_kab } = req.params;
  
  let query;
  let queryParams = [];

  if (kode_prop === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
  } else if (kode_kab === "0") {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop]; // Only add kode_prop
  } else {
      query = `
          SELECT jenis_kendaraan, SUM(nominal_kendaraan_tidak_bayar) AS total_jumlah
          FROM formatpkbrekap
          WHERE kode_prop = $1 AND kode_kab = $2 AND bulan = 12 AND tahun = 2021
          GROUP BY jenis_kendaraan
          ORDER BY jenis_kendaraan;
      `;
      queryParams = [kode_prop, kode_kab]; // Add both parameters
  }

  try {
      const result = await pool.query(query, queryParams); // Execute the query with parameters

      // Transforming the result into desired JSON format
      const responseData = {};
      result.rows.forEach(row => {
          responseData[row.jenis_kendaraan] = parseInt(row.total_jumlah); // Ensure the value is a number
      });

      res.json(responseData); // Sending JSON response
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Server error');
  }
});

// ==================================
// Endpoint to fetch data based on ID
// ==================================

app.get('/api/province/all', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT nomor, data, daerah, status, anggaranpkb, realisasipkb, persentasepkb
        FROM provinsi
      `);
  
      if (result.rows.length > 0) {
        res.json(result.rows); // Return all rows
      } else {
        res.status(404).json({ message: 'No provinces found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });  

app.get('/api/province/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT anggaranpkb, realisasipkb, anggaranbbnkb, realisasibbnkb, daerah 
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

app.get('/api/kabupaten-data/:provinceId', async (req, res) => {
    const { provinceId } = req.params;
    try {
      const result = await pool.query(`
        SELECT kabupatenid, targetpkb, realisasipkb, targetbbnkb, realisasibbnkb
        FROM kabupatendata
        WHERE provinsiid = $1`, [provinceId]);
  
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({ message: 'No kabupaten found for this province' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/kabupatendetail/:provinceId', async (req, res) => {
    const { provinceId } = req.params;
    try {
      const result = await pool.query(`
        SELECT kabupatenkota
        FROM kabupatenmasterdetail
        WHERE provinsiid = $1`, [provinceId]);
  
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({ message: 'No kabupaten found for this province' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

// 2	Data Jumlah Kendaraan bermotor (sesuai data Pemda)
app.get('/api/tipekendaraan/count', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT
              SUM(CASE WHEN jenisKendaraan = 'A' THEN jumlahKendaraan ELSE 0 END) AS "A",
              SUM(CASE WHEN jenisKendaraan = 'B' THEN jumlahKendaraan ELSE 0 END) AS "B",
              SUM(CASE WHEN jenisKendaraan = 'C' THEN jumlahKendaraan ELSE 0 END) AS "C",
              SUM(CASE WHEN jenisKendaraan = 'D' THEN jumlahKendaraan ELSE 0 END) AS "D",
              SUM(CASE WHEN jenisKendaraan = 'E' THEN jumlahKendaraan ELSE 0 END) AS "E",
              SUM(CASE WHEN jenisKendaraan = 'F' THEN jumlahKendaraan ELSE 0 END) AS "F"
          FROM newpkbrekap
          WHERE tahun = 2024;
      `);

      const counts = result.rows[0];
      const response = Object.keys(counts).map(tipekendaraan => ({
          tipekendaraan,
          count: counts[tipekendaraan],
      }));

      res.json(response);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

// 3	Data Jumlah Kendaraan bermotor yg tidak membayar pajak selama 5 th
// 4	Data Jumlah Kendaraan bermotor yg tidak membayar pajak selama 7th

app.get('/api/tipekendaraan/tidakbayar', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT
              SUM(CASE WHEN jenisKendaraan = 'A' THEN jumlahKendaraanTidakBayar5Tahun ELSE 0 END) AS "A_5",
              SUM(CASE WHEN jenisKendaraan = 'B' THEN jumlahKendaraanTidakBayar5Tahun ELSE 0 END) AS "B_5",
              SUM(CASE WHEN jenisKendaraan = 'C' THEN jumlahKendaraanTidakBayar5Tahun ELSE 0 END) AS "C_5",
              SUM(CASE WHEN jenisKendaraan = 'D' THEN jumlahKendaraanTidakBayar5Tahun ELSE 0 END) AS "D_5",
              SUM(CASE WHEN jenisKendaraan = 'E' THEN jumlahKendaraanTidakBayar5Tahun ELSE 0 END) AS "E_5",
              SUM(CASE WHEN jenisKendaraan = 'F' THEN jumlahKendaraanTidakBayar5Tahun ELSE 0 END) AS "F_5",
              SUM(CASE WHEN jenisKendaraan = 'A' THEN jumlahKendaraanTidakBayar7Tahun ELSE 0 END) AS "A_7",
              SUM(CASE WHEN jenisKendaraan = 'B' THEN jumlahKendaraanTidakBayar7Tahun ELSE 0 END) AS "B_7",
              SUM(CASE WHEN jenisKendaraan = 'C' THEN jumlahKendaraanTidakBayar7Tahun ELSE 0 END) AS "C_7",
              SUM(CASE WHEN jenisKendaraan = 'D' THEN jumlahKendaraanTidakBayar7Tahun ELSE 0 END) AS "D_7",
              SUM(CASE WHEN jenisKendaraan = 'E' THEN jumlahKendaraanTidakBayar7Tahun ELSE 0 END) AS "E_7",
              SUM(CASE WHEN jenisKendaraan = 'F' THEN jumlahKendaraanTidakBayar7Tahun ELSE 0 END) AS "F_7"
          FROM newpkbrekap
          WHERE tahun = 2024;
      `);

      const counts5Years = {
          'A': result.rows[0]['A_5'],
          'B': result.rows[0]['B_5'],
          'C': result.rows[0]['C_5'],
          'D': result.rows[0]['D_5'],
          'E': result.rows[0]['E_5'],
          'F': result.rows[0]['F_5'],
      };

      const counts7Years = {
          'A': result.rows[0]['A_7'],
          'B': result.rows[0]['B_7'],
          'C': result.rows[0]['C_7'],
          'D': result.rows[0]['D_7'],
          'E': result.rows[0]['E_7'],
          'F': result.rows[0]['F_7'],
      };

      res.json({ counts5Years, counts7Years });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

// 5	Data jumlah Kendaraan bermotor yg membayar pajak thn berjalan

app.get('/api/tipekendaraan/bayar', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT
              SUM(CASE WHEN jenisKendaraan = 'A' THEN kendaraanBayar ELSE 0 END) AS "A",
              SUM(CASE WHEN jenisKendaraan = 'B' THEN kendaraanBayar ELSE 0 END) AS "B",
              SUM(CASE WHEN jenisKendaraan = 'C' THEN kendaraanBayar ELSE 0 END) AS "C",
              SUM(CASE WHEN jenisKendaraan = 'D' THEN kendaraanBayar ELSE 0 END) AS "D",
              SUM(CASE WHEN jenisKendaraan = 'E' THEN kendaraanBayar ELSE 0 END) AS "E",
              SUM(CASE WHEN jenisKendaraan = 'F' THEN kendaraanBayar ELSE 0 END) AS "F"
          FROM newpkbrekap
          WHERE tahun = 2024;
      `);

      const counts = result.rows[0];
      const response = Object.keys(counts).map(tipekendaraan => ({
          tipekendaraan,
          count: counts[tipekendaraan],
      }));

      res.json(response);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

// 6	Data jumlah Kendaraan bermotor baru

app.get('/api/tipekendaraan/baru', async (req, res) => {
  try {
    // Query for 2024 data, grouped by jeniskendaraan
    const result2024 = await pool.query(`
      SELECT jeniskendaraan, SUM(jumlahkendaraan) AS jumlahkendaraan
      FROM newpkbrekap
      WHERE tahun = 2024
      GROUP BY jeniskendaraan
    `);

    // Query for 2023 data, grouped by jeniskendaraan
    const result2023 = await pool.query(`
      SELECT jeniskendaraan, SUM(jumlahkendaraan) AS jumlahkendaraan
      FROM newpkbrekap
      WHERE tahun = 2023
      GROUP BY jeniskendaraan
    `);

    // Ensure the key names match the column names returned from the query
    const data2024 = result2024.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    const data2023 = result2023.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    // Map the vehicle types and calculate the difference
    const response = ['A', 'B', 'C', 'D', 'E', 'F'].map(tipekendaraan => ({
      tipekendaraan: tipekendaraan,
      count: (data2024[tipekendaraan] || 0) - (data2023[tipekendaraan] || 0),
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});


// 7	Data Jumlah Kendaraan bermotor yg tidak membayar  pajak selama 5 th (dalam bentuk Rupiah)
// 8	Data Jumlah Kendaraan bermotor yg tidak membayar  pajak selama 7 thn (dalam bentuk Rupiah)
// 9	Data Jumlah Kendaraan bermotor yg tidak membayar  pajak selama 1 thn (dalam bentuk Rupiah)

app.get('/api/tipekendaraan/tidakbayarrupiah', async (req, res) => {
  try {
    // Fetch and group data for 2024, summing the relevant columns
    const result2024 = await pool.query(`
      SELECT 
        jeniskendaraan, 
        SUM(target) AS target, 
        SUM(realisasi) AS realisasi, 
        SUM(nilaikendaraantidakbayar5tahun) AS nilaikendaraantidakbayar5tahun, 
        SUM(nilaikendaraantidakbayar7tahun) AS nilaikendaraantidakbayar7tahun
      FROM newpkbrekap
      WHERE tahun = 2024
      GROUP BY jeniskendaraan
    `);

    // Prepare objects to hold the results
    const count1years = {};
    const count5years = {};
    const count7years = {};

    // Process the fetched data
    result2024.rows.forEach(row => {
      const { jeniskendaraan, target, realisasi, nilaikendaraantidakbayar5tahun, nilaikendaraantidakbayar7tahun } = row;

      // Calculate count1years by subtracting realisasi from target
      count1years[jeniskendaraan] = (target || 0) - (realisasi || 0);

      // Directly assign values for count5years and count7years
      count5years[jeniskendaraan] = nilaikendaraantidakbayar5tahun || 0;
      count7years[jeniskendaraan] = nilaikendaraantidakbayar7tahun || 0;
    });

    // Function to sort an object by keys
    const sortObjectByKey = obj => 
      Object.keys(obj)
        .sort() // Sort keys alphabetically
        .reduce((sortedObj, key) => {
          sortedObj[key] = obj[key];
          return sortedObj;
        }, {});

    // Sort the result objects by their keys (jeniskendaraan)
    const sortedCounts1Years = sortObjectByKey(count1years);
    const sortedCounts5Years = sortObjectByKey(count5years);
    const sortedCounts7Years = sortObjectByKey(count7years);

    // Send the sorted response
    res.json({
      counts1Years: sortedCounts1Years,
      counts5Years: sortedCounts5Years,
      counts7Years: sortedCounts7Years,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});







// 10	Data jumlah kendaraan yang membayar pajak secara online dan offline

app.get('/api/paymethod/count', async (req, res) => {
  try {
      // Query the pkbmetode table for online and offline payment counts
      const result = await pool.query(`
          SELECT 
              SUM(jumlahonline) AS "online",
              SUM(jumlahoffline) AS "offline"
          FROM pkbmetode
          WHERE tahun = 2024
      `);

      // Prepare the response
      const counts = result.rows[0];
      const response = Object.keys(counts).map(metodepembayaran => ({
          metodepembayaran,
          count: counts[metodepembayaran],
      }));

      res.json(response);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});
// 11	Data jumlah pembayaran PKB secara online dan offline (dalam bentuk Rupiah)

app.get('/api/paymethod/rupiah', async (req, res) => {
  try {
      // Query the pkbmetode table for online and offline payment counts
      const result = await pool.query(`
          SELECT 
              SUM(nilaionline) AS "online",
              SUM(nilaioffline) AS "offline"
          FROM pkbmetode
          WHERE tahun = 2024
      `);

      // Prepare the response
      const counts = result.rows[0];
      const response = Object.keys(counts).map(metodepembayaran => ({
          metodepembayaran,
          count: counts[metodepembayaran],
      }));

      res.json(response);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

// 12	Data jumlah Kendaraan Bermotor 1,2 dan 3 tahun sebelum (sesuai tipe) LINE CHART HISTORIC

app.get('/api/tipekendaraan/count123', async (req, res) => {
  try {
    // Query for 2023 data
    const result2023 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2023
      GROUP BY jeniskendaraan
    `);

    // Query for 2022 data
    const result2022 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2022
      GROUP BY jeniskendaraan
    `);

    // Query for 2021 data
    const result2021 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2021
      GROUP BY jeniskendaraan
    `);

    // Prepare objects to hold counts for each type
    const counts1Years = {};
    const counts2Years = {};
    const counts3Years = {};

    // Map to store data by jeniskendaraan
    result2023.rows.forEach(row => {
      counts1Years[row.jeniskendaraan] = row.jumlahkendaraan;
    });

    result2022.rows.forEach(row => {
      counts2Years[row.jeniskendaraan] = row.jumlahkendaraan;
    });

    result2021.rows.forEach(row => {
      counts3Years[row.jeniskendaraan] = row.jumlahkendaraan;
    });

    // Send the response
    res.json({
      counts1Years,
      counts2Years,
      counts3Years,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});



// 13	Data jumlah Kendaraan Bermotor yang membayar Pajak 1,2 dan 3 tahun sebelum (sesuai tipe)

app.get('/api/tipekendaraan/pajak123', async (req, res) => {
  try {
    // Query for 2023 data
    const result2023 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2023
      GROUP BY jeniskendaraan
    `);

    // Query for 2022 data
    const result2022 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2022
      GROUP BY jeniskendaraan
    `);

    // Query for 2021 data
    const result2021 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2021
      GROUP BY jeniskendaraan
    `);

    // Prepare objects to hold counts for each type
    const counts1Years = {};
    const counts2Years = {};
    const counts3Years = {};

    // Map to store data by jeniskendaraan
    result2023.rows.forEach(row => {
      counts1Years[row.jeniskendaraan] = row.kendaraanbayar;
    });

    result2022.rows.forEach(row => {
      counts2Years[row.jeniskendaraan] = row.kendaraanbayar;
    });

    result2021.rows.forEach(row => {
      counts3Years[row.jeniskendaraan] = row.kendaraanbayar;
    });

    // Send the response
    res.json({
      counts1Years,
      counts2Years,
      counts3Years,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});




// 14	Data jumlah Kendaraan Bermotor yang tidak membayar pajak 1,2 dan 3 tahun sebelum (sesuai tipe)

app.get('/api/tipekendaraan/xpajak123', async (req, res) => {
  try {
    // Query for 2024 data
    const result2024 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(jumlahkendaraan) AS "jumlahkendaraan",
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2024
      GROUP BY jeniskendaraan
    `);

    // Query for 2023 data
    const result2023 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(jumlahkendaraan) AS "jumlahkendaraan",
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2023
      GROUP BY jeniskendaraan
    `);

    // Query for 2022 data
    const result2022 = await pool.query(`
      SELECT 
        jeniskendaraan,
        SUM(jumlahkendaraan) AS "jumlahkendaraan",
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2022
      GROUP BY jeniskendaraan
    `);

    // Prepare objects to hold counts for each type
    const counts1Years = {};
    const counts2Years = {};
    const counts3Years = {};

    // Map to store data by jeniskendaraan
    result2024.rows.forEach(row => {
      counts1Years[row.jeniskendaraan] = row.jumlahkendaraan - row.kendaraanbayar; // 1 year ago = 2023
    });

    result2023.rows.forEach(row => {
      counts2Years[row.jeniskendaraan] = row.jumlahkendaraan - row.kendaraanbayar; // 2 years ago = 2022
    });

    result2022.rows.forEach(row => {
      counts3Years[row.jeniskendaraan] = row.jumlahkendaraan - row.kendaraanbayar; // 3 years ago = 2021
    });

    // Send the response
    res.json({
      counts1Years, // 2023 data
      counts2Years, // 2022 data
      counts3Years, // 2021 data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});



// 15	Data jumlah Kendaraan Bermotor yang membayar Pajak 1,2 dan 3 tahun sebelum sesuai tipe. (Dalam bentuk Rupiah)

app.get('/api/tipekendaraan/pajak123rupiah', async (req, res) => {
  try {
      // Query for 2024 data
      const result2024 = await pool.query(`
          SELECT 
              SUM(CASE WHEN jeniskendaraan = 'A' THEN realisasi ELSE 0 END) AS "A",
              SUM(CASE WHEN jeniskendaraan = 'B' THEN realisasi ELSE 0 END) AS "B",
              SUM(CASE WHEN jeniskendaraan = 'C' THEN realisasi ELSE 0 END) AS "C",
              SUM(CASE WHEN jeniskendaraan = 'D' THEN realisasi ELSE 0 END) AS "D",
              SUM(CASE WHEN jeniskendaraan = 'E' THEN realisasi ELSE 0 END) AS "E",
              SUM(CASE WHEN jeniskendaraan = 'F' THEN realisasi ELSE 0 END) AS "F"
          FROM newpkbrekap
          WHERE tahun = 2024
      `);

      // Query for 2023 data
      const result2023 = await pool.query(`
          SELECT 
              SUM(CASE WHEN jeniskendaraan = 'A' THEN realisasi ELSE 0 END) AS "A",
              SUM(CASE WHEN jeniskendaraan = 'B' THEN realisasi ELSE 0 END) AS "B",
              SUM(CASE WHEN jeniskendaraan = 'C' THEN realisasi ELSE 0 END) AS "C",
              SUM(CASE WHEN jeniskendaraan = 'D' THEN realisasi ELSE 0 END) AS "D",
              SUM(CASE WHEN jeniskendaraan = 'E' THEN realisasi ELSE 0 END) AS "E",
              SUM(CASE WHEN jeniskendaraan = 'F' THEN realisasi ELSE 0 END) AS "F"
          FROM newpkbrekap
          WHERE tahun = 2023
      `);

      // Query for 2022 data
      const result2022 = await pool.query(`
          SELECT 
              SUM(CASE WHEN jeniskendaraan = 'A' THEN realisasi ELSE 0 END) AS "A",
              SUM(CASE WHEN jeniskendaraan = 'B' THEN realisasi ELSE 0 END) AS "B",
              SUM(CASE WHEN jeniskendaraan = 'C' THEN realisasi ELSE 0 END) AS "C",
              SUM(CASE WHEN jeniskendaraan = 'D' THEN realisasi ELSE 0 END) AS "D",
              SUM(CASE WHEN jeniskendaraan = 'E' THEN realisasi ELSE 0 END) AS "E",
              SUM(CASE WHEN jeniskendaraan = 'F' THEN realisasi ELSE 0 END) AS "F"
          FROM newpkbrekap
          WHERE tahun = 2022
      `);

      const counts1Years = {
          'A': result2024.rows[0]['A'],
          'B': result2024.rows[0]['B'],
          'C': result2024.rows[0]['C'],
          'D': result2024.rows[0]['D'],
          'E': result2024.rows[0]['E'],
          'F': result2024.rows[0]['F'],
      };

      const counts2Years = {
          'A': result2023.rows[0]['A'],
          'B': result2023.rows[0]['B'],
          'C': result2023.rows[0]['C'],
          'D': result2023.rows[0]['D'],
          'E': result2023.rows[0]['E'],
          'F': result2023.rows[0]['F'],
      };

      const counts3Years = {
          'A': result2022.rows[0]['A'],
          'B': result2022.rows[0]['B'],
          'C': result2022.rows[0]['C'],
          'D': result2022.rows[0]['D'],
          'E': result2022.rows[0]['E'],
          'F': result2022.rows[0]['F'],
      };

      res.json({ counts1Years, counts2Years, counts3Years });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});


// 16	Data jumlah Kendaraan Bermotor yang tidak membayar pajak 1,2 dan 3 tahun sebelum sesuai tipe. (Dalam bentuk Rupiah)

app.get('/api/tipekendaraan/xpajak123rupiah', async (req, res) => {
  try {
      // Query for 2024 data
      const result2024 = await pool.query(`
          SELECT 
              SUM(CASE WHEN jeniskendaraan = 'A' THEN target - realisasi ELSE 0 END) AS "A_1",
              SUM(CASE WHEN jeniskendaraan = 'B' THEN target - realisasi ELSE 0 END) AS "B_1",
              SUM(CASE WHEN jeniskendaraan = 'C' THEN target - realisasi ELSE 0 END) AS "C_1",
              SUM(CASE WHEN jeniskendaraan = 'D' THEN target - realisasi ELSE 0 END) AS "D_1",
              SUM(CASE WHEN jeniskendaraan = 'E' THEN target - realisasi ELSE 0 END) AS "E_1",
              SUM(CASE WHEN jeniskendaraan = 'F' THEN target - realisasi ELSE 0 END) AS "F_1"
          FROM newpkbrekap
          WHERE tahun = 2024
      `);

      // Query for 2023 data
      const result2023 = await pool.query(`
          SELECT 
              SUM(CASE WHEN jeniskendaraan = 'A' THEN target - realisasi ELSE 0 END) AS "A_2",
              SUM(CASE WHEN jeniskendaraan = 'B' THEN target - realisasi ELSE 0 END) AS "B_2",
              SUM(CASE WHEN jeniskendaraan = 'C' THEN target - realisasi ELSE 0 END) AS "C_2",
              SUM(CASE WHEN jeniskendaraan = 'D' THEN target - realisasi ELSE 0 END) AS "D_2",
              SUM(CASE WHEN jeniskendaraan = 'E' THEN target - realisasi ELSE 0 END) AS "E_2",
              SUM(CASE WHEN jeniskendaraan = 'F' THEN target - realisasi ELSE 0 END) AS "F_2"
          FROM newpkbrekap
          WHERE tahun = 2023
      `);

      // Query for 2022 data
      const result2022 = await pool.query(`
          SELECT 
              SUM(CASE WHEN jeniskendaraan = 'A' THEN target - realisasi ELSE 0 END) AS "A_3",
              SUM(CASE WHEN jeniskendaraan = 'B' THEN target - realisasi ELSE 0 END) AS "B_3",
              SUM(CASE WHEN jeniskendaraan = 'C' THEN target - realisasi ELSE 0 END) AS "C_3",
              SUM(CASE WHEN jeniskendaraan = 'D' THEN target - realisasi ELSE 0 END) AS "D_3",
              SUM(CASE WHEN jeniskendaraan = 'E' THEN target - realisasi ELSE 0 END) AS "E_3",
              SUM(CASE WHEN jeniskendaraan = 'F' THEN target - realisasi ELSE 0 END) AS "F_3"
          FROM newpkbrekap
          WHERE tahun = 2022
      `);

      const counts1Years = {
          'A': result2024.rows[0]['A_1'],
          'B': result2024.rows[0]['B_1'],
          'C': result2024.rows[0]['C_1'],
          'D': result2024.rows[0]['D_1'],
          'E': result2024.rows[0]['E_1'],
          'F': result2024.rows[0]['F_1'],
      };

      const counts2Years = {
          'A': result2023.rows[0]['A_2'],
          'B': result2023.rows[0]['B_2'],
          'C': result2023.rows[0]['C_2'],
          'D': result2023.rows[0]['D_2'],
          'E': result2023.rows[0]['E_2'],
          'F': result2023.rows[0]['F_2'],
      };

      const counts3Years = {
          'A': result2022.rows[0]['A_3'],
          'B': result2022.rows[0]['B_3'],
          'C': result2022.rows[0]['C_3'],
          'D': result2022.rows[0]['D_3'],
          'E': result2022.rows[0]['E_3'],
          'F': result2022.rows[0]['F_3'],
      };

      res.json({ counts1Years, counts2Years, counts3Years });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

//
// PEMEKARAN
//

app.get('/api/pemekaran/platbm', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT plat_bm
      FROM bermasalah`);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/pemekaran/platbpserix', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT plat_bp_seri_x
      FROM bermasalah`);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/pemekaran/tipekosong', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tipe_kosong
      FROM bermasalah`);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/pemekaran/tipegolkendkosong', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tipe_ada_golkend_kosong 
      FROM bermasalah`);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/pemekaran/noplatganda', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT no_plat_ganda
      FROM bermasalah`);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/pemekaran/nochasisganda', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT no_chasis_ganda
      FROM bermasalah`);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/pemekaran/nomesinganda', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT no_mesin_ganda
      FROM bermasalah`);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found' });
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
