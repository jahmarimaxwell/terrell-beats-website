
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import pool from "./db.js";

dotenv.config({
  path: new URL("../.env", import.meta.url),
});

const rl = createInterface({ input, output });

try {
  const username = (await rl.question("Admin username: ")).trim();
  const email = (await rl.question("Admin email: ")).trim().toLowerCase();
  const password = await rl.question("Admin password: ");

  if (!username || !email || password.length < 12) {
    throw new Error(
      "Username and email are required; password must have at least 12 characters."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash, role)
     VALUES ($1, $2, $3, 'admin')
     RETURNING id, username, email, role`,
    [username, email, passwordHash]
  );

  console.log("Admin created successfully:", result.rows[0]);
} catch (error) {
  console.error("Could not create admin:", error.message);
} finally {
  rl.close();
  await pool.end();
}
