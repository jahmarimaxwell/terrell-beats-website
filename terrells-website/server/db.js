import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "beat_store",
  password: "Maximum456!",
  port: 5432
});

export default pool;