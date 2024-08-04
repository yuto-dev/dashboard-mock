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

app.get('/api/kabupaten/:provinceId', async (req, res) => {
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

    // Send the response
    res.json({
      counts1Years: count1years,
      counts5Years: count5years,
      counts7Years: count7years,
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
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2023
    `);

    // Query for 2022 data
    const result2022 = await pool.query(`
      SELECT 
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2022
    `);

    // Query for 2021 data
    const result2021 = await pool.query(`
      SELECT 
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2021
    `);

    // Log the results for debugging
    console.log('Result 2023:', result2023.rows);
    console.log('Result 2022:', result2022.rows);
    console.log('Result 2021:', result2021.rows);

    // Prepare objects to hold counts for each type
    const counts1Years = {};
    const counts2Years = {};
    const counts3Years = {};

    // Map to store data by jenisKendaraan
    const data2023 = result2023.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    const data2022 = result2022.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    const data2021 = result2021.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    // Log the processed data
    console.log('Data 2023:', data2023);
    console.log('Data 2022:', data2022);
    console.log('Data 2021:', data2021);

    // Calculate counts
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(type => {
      counts1Years[type] = (data2023[type] || 0)
      counts2Years[type] = (data2022[type] || 0)
      counts3Years[type] = (data2021[type] || 0); // For 3 years, use the data from 2021
    });

    // Log the final counts
    console.log('Counts 1 Year:', counts1Years);
    console.log('Counts 2 Years:', counts2Years);
    console.log('Counts 3 Years:', counts3Years);

    // Send the response
    res.json({
      counts1Years,
      counts2Years,
      counts3Years,
    });
  } catch (err) {
    console.error('Error fetching tipekendaraan/count123 data:', err);
    res.status(500).send('Error fetching data');
  }
});



// 13	Data jumlah Kendaraan Bermotor yang membayar Pajak 1,2 dan 3 tahun sebelum (sesuai tipe)

app.get('/api/tipekendaraan/pajak123', async (req, res) => {
  try {
    // Query for 2024 data
    const result2024 = await pool.query(`
      SELECT 
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2024
    `);

    // Query for 2023 data
    const result2023 = await pool.query(`
      SELECT 
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2023
    `);

    // Query for 2022 data
    const result2022 = await pool.query(`
      SELECT 
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan"
      FROM newpkbrekap
      WHERE tahun = 2022
    `);

    // Prepare objects to hold counts for each type
    const counts1Years = {};
    const counts2Years = {};
    const counts3Years = {};

    // Map to store data by jenisKendaraan
    const data2024 = result2024.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    const data2023 = result2023.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    const data2022 = result2022.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = row.jumlahkendaraan;
      return acc;
    }, {});

    // Calculate counts
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(type => {
      counts1Years[type] = (data2024[type] || 0)
      counts2Years[type] = (data2023[type] || 0)
      counts3Years[type] = (data2022[type] || 0); // For 3 years, use the data from 2022
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
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan",
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2024
    `);

    // Query for 2023 data
    const result2023 = await pool.query(`
      SELECT 
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan",
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2023
    `);

    // Query for 2022 data
    const result2022 = await pool.query(`
      SELECT 
        SUM(jeniskendaraan) AS "jeniskendaraan",
        SUM(jumlahkendaraan) AS "jumlahkendaraan",
        SUM(kendaraanbayar) AS "kendaraanbayar"
      FROM newpkbrekap
      WHERE tahun = 2022
    `);

    // Prepare objects to hold counts for each type
    const counts1Years = {};
    const counts2Years = {};
    const counts3Years = {};

    // Map to store data by jenisKendaraan
    const data2024 = result2024.rows.reduce((acc, row) => {
      acc[row.jenisKendaraan] = {
        jumlah: row.jumlahKendaraan,
        bayar: row.kendaraanBayar
      };
      return acc;
    }, {});

    const data2023 = result2023.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = {
        jumlah: row.jumlahkendaraan,
        bayar: row.kendaraanbayar
      };
      return acc;
    }, {});

    const data2022 = result2022.rows.reduce((acc, row) => {
      acc[row.jeniskendaraan] = {
        jumlah: row.jumlahkendaraan,
        bayar: row.kendaraanbayar
      };
      return acc;
    }, {});

    // Calculate counts
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(type => {
      counts1Years[type] = (data2024[type] ? data2024[type].jumlah - data2024[type].bayar : 0);
      counts2Years[type] = (data2023[type] ? data2023[type].jumlah - data2023[type].bayar : 0);
      counts3Years[type] = (data2022[type] ? data2022[type].jumlah - data2022[type].bayar : 0);
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

// Start the server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
