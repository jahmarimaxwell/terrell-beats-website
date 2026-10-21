import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import pool from "./db.js";
import requireAdmin from "./middleware/requireAdmin.js";

dotenv.config({
  path: new URL("../.env", import.meta.url),
});

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing from .env");
}

const app = express();

// 1. Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// 2. Allow Express to read JSON
app.use(express.json());

// 3. Configure login sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // Local development only
    },
  })
);


app.get("/api/beats", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM beats ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get beats" });
  }
});

app.post("/api/beats", requireAdmin, async (req, res) => {
  try {
    const { title, bpm, price, tags, time, audio_url } = req.body;

    const result = await pool.query(
      `INSERT INTO beats
       (title, bpm, price, tags, time, audio_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, bpm, price, tags, time, audio_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating beat:", error);

    res.status(500).json({
      error: "Failed to create beat"
    });
  }
});

app.listen(3000, () => {
  console.log("Express server running on port 3000");
});