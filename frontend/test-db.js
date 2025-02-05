const { Client } = require('pg');

const client = new Client({
  connectionString: "URL DE BASE DE DATOS",
  ssl: { rejectUnauthorized: false }
});


client.connect()
  .then(() => console.log("✅ Conectado a Supabase"))
  .catch(err => console.error("❌ Error de conexión:", err))
  .finally(() => client.end());
