const express = require("express");
const cors = require("cors");
const path = require('path'); // Importar path
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// API para obtener citas desde la base de datos
const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/api/citasBackend", async (req, res) => {
    try {
        console.log('Entro en citasBack');
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

app.get("/citas", async (req, res) => {
    try {
        console.log('Entro en citas');
        const result = await pool.query("SELECT * FROM citas");
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener las citas:', err);
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

// Servir los archivos estáticos del frontend (la carpeta build)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));


// ⚠️ **Solo redirigir a index.html si NO es una ruta API**
app.get("*", (req, res) => {
    if (!req.path.startsWith("/api/")) { 
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    } else {
        res.status(404).json({ error: "Ruta no encontrada" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

