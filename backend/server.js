const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos PostgreSQL
const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ✅ API para obtener citas desde la base de datos
app.get("/api/citasBackend", async (req, res) => {
    try {
        console.log("Entro en citasBackend");
        const result = await pool.query("SELECT * FROM citas");
        res.json(result.rows);
    } catch (err) {
        console.error("Error al obtener las citas:", err);
        res.status(500).json({ error: "Error al obtener las citas" });
    }
});

// ✅ Ruta API de ejemplo
app.get("/api/appointments", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
});

// ✅ Otra ruta de citas
app.get("/api/citas", async (req, res) => {
    try {
        console.log("Entro en citas");
        const result = await pool.query("SELECT * FROM citas");
        res.json(result.rows);
    } catch (err) {
        console.error("Error al obtener las citas:", err);
        res.status(500).json({ error: "Error al obtener las citas" });
    }
});

// ✅ Servir los archivos estáticos correctamente
const frontendPath = path.join(__dirname, "../frontend/build"); // Ajustar si es necesario
app.use(express.static(frontendPath));

// ✅ Asegurar que las rutas de API existen antes de servir index.html
app.use("/api", (req, res, next) => {
    res.status(404).json({ error: "Ruta API no encontrada" });
});

// ✅ Después de las rutas de API, servir el frontend correctamente
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});


// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
