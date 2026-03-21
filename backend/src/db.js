import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clinica",
  password: "001746",
  port: 5433,
});

export default pool;