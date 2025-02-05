const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/appointments', (req, res) => {
    res.json({ message: 'API funcionando correctamente' }); // Devuelve JSON válido
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Servidor en http://localhost:${PORT}'));

const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/citas", async (req, res) => {
    const result = await pool.query("SELECT * FROM citas");
    res.json(result.rows);
});

