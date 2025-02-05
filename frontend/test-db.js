const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_HzaD6V7cIyib@ep-raspy-sun-a221b9zv-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false }
});


client.connect()
  .then(() => console.log("✅ Conectado a Supabase"))
  .catch(err => console.error("❌ Error de conexión:", err))
  .finally(() => client.end());
