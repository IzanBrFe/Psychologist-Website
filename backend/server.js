const express = require("express");
const cors = require("cors");
const path = require('path'); // Importar path
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir los archivos estáticos del frontend (la carpeta build)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// API para obtener citas desde la base de datos
const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/citas", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM citas");
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener las citas:', err);
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

// Ruta API de ejemplo (solo para verificar si la API está funcionando)
app.get('/api/appointments', (req, res) => {
    res.json({ message: 'API funcionando correctamente' }); // Devuelve JSON válido
});

// Redirigir todas las rutas no API a index.html para manejar las rutas del frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

