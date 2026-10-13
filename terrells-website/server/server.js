import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

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
    const { title, bpm, price, tags, audio_url } = req.body;

    const result = await pool.query(
      `INSERT INTO beats (title, bpm, price, tags, audio_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, bpm, price, tags, audio_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create beat" });
  }
});

app.listen(3000, () => {
  console.log("Express server running on port 3000");
});