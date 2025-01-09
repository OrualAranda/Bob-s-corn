const { Pool } = require("pg");
require("dotenv").config();

//? Configuración del pool de conexiones a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//? Evento para manejar errores de conexión
pool.on("error", (err) => {
  console.error("Unexpected error in PostgreSQL client", err);
  process.exit(-1);
});

module.exports = pool;
