// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'abi',
  host: 'localhost',
  database: 'depdagri',
  password: 'abi',
  port: 5432,
});

// Endpoint to fetch data based on ID
app.get('/api/province/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Province ID:', id);
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

// 2	Data Jumlah Kendaraan bermotor (sesuai data Pemda)
app.get('/api/tipekendaraan/count', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              jumlah_tipe_a AS "A",
              jumlah_tipe_b AS "B",
              jumlah_tipe_c AS "C",
              jumlah_tipe_d AS "D",
              jumlah_tipe_e AS "E",
              jumlah_tipe_f AS "F"
          FROM pkbrekap
          WHERE year = 2024
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

//3	Data Jumlah Kendaraan bermotor yg tidak membayar pajak selama 5 th
// 4	Data Jumlah Kendaraan bermotor yg tidak membayar pajak selama 7th

app.get('/api/tipekendaraan/tidakbayar', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              tidak_bayar_5_thn_tipe_a AS "A_5",
              tidak_bayar_5_thn_tipe_b AS "B_5",
              tidak_bayar_5_thn_tipe_c AS "C_5",
              tidak_bayar_5_thn_tipe_d AS "D_5",
              tidak_bayar_5_thn_tipe_e AS "E_5",
              tidak_bayar_5_thn_tipe_f AS "F_5",
              tidak_bayar_7_thn_tipe_a AS "A_7",
              tidak_bayar_7_thn_tipe_b AS "B_7",
              tidak_bayar_7_thn_tipe_c AS "C_7",
              tidak_bayar_7_thn_tipe_d AS "D_7",
              tidak_bayar_7_thn_tipe_e AS "E_7",
              tidak_bayar_7_thn_tipe_f AS "F_7"
          FROM pkbrekap
          WHERE year = 2024
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
              membayar_pajak_thn_berjalan_tipe_a AS "A",
              membayar_pajak_thn_berjalan_tipe_b AS "B",
              membayar_pajak_thn_berjalan_tipe_c AS "C",
              membayar_pajak_thn_berjalan_tipe_d AS "D",
              membayar_pajak_thn_berjalan_tipe_e AS "E",
              membayar_pajak_thn_berjalan_tipe_f AS "F"
          FROM pkbrekap
          WHERE year = 2024
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
      const result = await pool.query(`
          SELECT 
              baru_tipe_a AS "A",
              baru_tipe_b AS "B",
              baru_tipe_c AS "C",
              baru_tipe_d AS "D",
              baru_tipe_e AS "E",
              baru_tipe_f AS "F"
          FROM pkbrekap
          WHERE year = 2024
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

// 7	Data Jumlah Kendaraan bermotor yg tidak membayar  pajak selama 5 th (dalam bentuk Rupiah)
// 8	Data Jumlah Kendaraan bermotor yg tidak membayar  pajak selama 7 thn (dalam bentuk Rupiah)
// 9	Data Jumlah Kendaraan bermotor yg tidak membayar  pajak selama 1 thn (dalam bentuk Rupiah)

app.get('/api/tipekendaraan/tidakbayarrupiah', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              tidak_bayar_1_thn_tipe_a_rupiah AS "A_1",
              tidak_bayar_1_thn_tipe_b_rupiah AS "B_1",
              tidak_bayar_1_thn_tipe_c_rupiah AS "C_1",
              tidak_bayar_1_thn_tipe_d_rupiah AS "D_1",
              tidak_bayar_1_thn_tipe_e_rupiah AS "E_1",
              tidak_bayar_1_thn_tipe_f_rupiah AS "F_1",
              tidak_bayar_5_thn_tipe_a_rupiah AS "A_5",
              tidak_bayar_5_thn_tipe_b_rupiah AS "B_5",
              tidak_bayar_5_thn_tipe_c_rupiah AS "C_5",
              tidak_bayar_5_thn_tipe_d_rupiah AS "D_5",
              tidak_bayar_5_thn_tipe_e_rupiah AS "E_5",
              tidak_bayar_5_thn_tipe_f_rupiah AS "F_5",
              tidak_bayar_7_thn_tipe_a_rupiah AS "A_7",
              tidak_bayar_7_thn_tipe_b_rupiah AS "B_7",
              tidak_bayar_7_thn_tipe_c_rupiah AS "C_7",
              tidak_bayar_7_thn_tipe_d_rupiah AS "D_7",
              tidak_bayar_7_thn_tipe_e_rupiah AS "E_7",
              tidak_bayar_7_thn_tipe_f_rupiah AS "F_7"
          FROM pkbrekap
          WHERE year = 2024
      `);

      const counts1Years = {
        'A': result.rows[0]['A_1'],
        'B': result.rows[0]['B_1'],
        'C': result.rows[0]['C_1'],
        'D': result.rows[0]['D_1'],
        'E': result.rows[0]['E_1'],
        'F': result.rows[0]['F_1'],
    };

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

      res.json({ counts1Years, counts5Years, counts7Years });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

// 10	Data jumlah kendaraan yang membayar pajak secara online dan offline

app.get('/api/paymethod/count', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              bayar_online AS "online",
              bayar_offline AS "offline"
          FROM pkbrekap
          WHERE year = 2024
      `);

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
      const result = await pool.query(`
          SELECT 
              bayar_online_rupiah AS "online",
              bayar_offline_rupiah AS "offline"
          FROM pkbrekap
          WHERE year = 2024
      `);

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
      // Query for 2024 data
      const result2024 = await pool.query(`
          SELECT 
              jumlah_tipe_a AS "A_1",
              jumlah_tipe_b AS "B_1",
              jumlah_tipe_c AS "C_1",
              jumlah_tipe_d AS "D_1",
              jumlah_tipe_e AS "E_1",
              jumlah_tipe_f AS "F_1"
          FROM pkbrekap
          WHERE year = 2024
      `);

      // Query for 2019 data
      const result2019 = await pool.query(`
          SELECT 
              jumlah_tipe_a AS "A_2",
              jumlah_tipe_b AS "B_2",
              jumlah_tipe_c AS "C_2",
              jumlah_tipe_d AS "D_2",
              jumlah_tipe_e AS "E_2",
              jumlah_tipe_f AS "F_2"
          FROM pkbrekap
          WHERE year = 2019
      `);

      // Query for 2017 data
      const result2017 = await pool.query(`
          SELECT 
              jumlah_tipe_a AS "A_3",
              jumlah_tipe_b AS "B_3",
              jumlah_tipe_c AS "C_3",
              jumlah_tipe_d AS "D_3",
              jumlah_tipe_e AS "E_3",
              jumlah_tipe_f AS "F_3"
          FROM pkbrekap
          WHERE year = 2017
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
          'A': result2019.rows[0]['A_2'],
          'B': result2019.rows[0]['B_2'],
          'C': result2019.rows[0]['C_2'],
          'D': result2019.rows[0]['D_2'],
          'E': result2019.rows[0]['E_2'],
          'F': result2019.rows[0]['F_2'],
      };

      const counts3Years = {
          'A': result2017.rows[0]['A_3'],
          'B': result2017.rows[0]['B_3'],
          'C': result2017.rows[0]['C_3'],
          'D': result2017.rows[0]['D_3'],
          'E': result2017.rows[0]['E_3'],
          'F': result2017.rows[0]['F_3'],
      };

      res.json({ counts1Years, counts2Years, counts3Years });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});


// 13	Data jumlah Kendaraan Bermotor yang membayar Pajak 1,2 dan 3 tahun sebelum (sesuai tipe)
// 14	Data jumlah Kendaraan Bermotor yang tidak membayar pajak 1,2 dan 3 tahun sebelum (sesuai tipe)

app.get('/api/tipekendaraan/pajak123', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              bayar_1_thn_tipe_a AS "A_1",
              bayar_1_thn_tipe_b AS "B_1",
              bayar_1_thn_tipe_c AS "C_1",
              bayar_1_thn_tipe_d AS "D_1",
              bayar_1_thn_tipe_e AS "E_1",
              bayar_1_thn_tipe_f AS "F_1",
              bayar_2_thn_tipe_a AS "A_2",
              bayar_2_thn_tipe_b AS "B_2",
              bayar_2_thn_tipe_c AS "C_2",
              bayar_2_thn_tipe_d AS "D_2",
              bayar_2_thn_tipe_e AS "E_2",
              bayar_2_thn_tipe_f AS "F_2",
              bayar_3_thn_tipe_a AS "A_3",
              bayar_3_thn_tipe_b AS "B_3",
              bayar_3_thn_tipe_c AS "C_3",
              bayar_3_thn_tipe_d AS "D_3",
              bayar_3_thn_tipe_e AS "E_3",
              bayar_3_thn_tipe_f AS "F_3"
          FROM pkbrekap
          WHERE year = 2024
      `);

      const counts1Years = {
        'A': result.rows[0]['A_1'],
        'B': result.rows[0]['B_1'],
        'C': result.rows[0]['C_1'],
        'D': result.rows[0]['D_1'],
        'E': result.rows[0]['E_1'],
        'F': result.rows[0]['F_1'],
    };

      const counts2Years = {
          'A': result.rows[0]['A_2'],
          'B': result.rows[0]['B_2'],
          'C': result.rows[0]['C_2'],
          'D': result.rows[0]['D_2'],
          'E': result.rows[0]['E_2'],
          'F': result.rows[0]['F_2'],
      };

      const counts3Years = {
          'A': result.rows[0]['A_3'],
          'B': result.rows[0]['B_3'],
          'C': result.rows[0]['C_3'],
          'D': result.rows[0]['D_3'],
          'E': result.rows[0]['E_3'],
          'F': result.rows[0]['F_3'],
      };

      res.json({ counts1Years, counts2Years, counts3Years });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

// 15	Data jumlah Kendaraan Bermotor yang membayar Pajak 1,2 dan 3 tahun sebelum sesuai tipe. (Dalam bentuk Rupiah)
// 16	Data jumlah Kendaraan Bermotor yang tidak membayar pajak 1,2 dan 3 tahun sebelum sesuai tipe. (Dalam bentuk Rupiah)

app.get('/api/tipekendaraan/pajak123rupiah', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              bayar_1_thn_tipe_a_rupiah AS "A_1",
              bayar_1_thn_tipe_b_rupiah AS "B_1",
              bayar_1_thn_tipe_c_rupiah AS "C_1",
              bayar_1_thn_tipe_d_rupiah AS "D_1",
              bayar_1_thn_tipe_e_rupiah AS "E_1",
              bayar_1_thn_tipe_f_rupiah AS "F_1",
              bayar_2_thn_tipe_a_rupiah AS "A_2",
              bayar_2_thn_tipe_b_rupiah AS "B_2",
              bayar_2_thn_tipe_c_rupiah AS "C_2",
              bayar_2_thn_tipe_d_rupiah AS "D_2",
              bayar_2_thn_tipe_e_rupiah AS "E_2",
              bayar_2_thn_tipe_f_rupiah AS "F_2",
              bayar_3_thn_tipe_a_rupiah AS "A_3",
              bayar_3_thn_tipe_b_rupiah AS "B_3",
              bayar_3_thn_tipe_c_rupiah AS "C_3",
              bayar_3_thn_tipe_d_rupiah AS "D_3",
              bayar_3_thn_tipe_e_rupiah AS "E_3",
              bayar_3_thn_tipe_f_rupiah AS "F_3"
          FROM pkbrekap
          WHERE year = 2024
      `);

      const counts1Years = {
        'A': result.rows[0]['A_1'],
        'B': result.rows[0]['B_1'],
        'C': result.rows[0]['C_1'],
        'D': result.rows[0]['D_1'],
        'E': result.rows[0]['E_1'],
        'F': result.rows[0]['F_1'],
    };

      const counts2Years = {
          'A': result.rows[0]['A_2'],
          'B': result.rows[0]['B_2'],
          'C': result.rows[0]['C_2'],
          'D': result.rows[0]['D_2'],
          'E': result.rows[0]['E_2'],
          'F': result.rows[0]['F_2'],
      };

      const counts3Years = {
          'A': result.rows[0]['A_3'],
          'B': result.rows[0]['B_3'],
          'C': result.rows[0]['C_3'],
          'D': result.rows[0]['D_3'],
          'E': result.rows[0]['E_3'],
          'F': result.rows[0]['F_3'],
      };

      res.json({ counts1Years, counts2Years, counts3Years });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
