import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import pool from "./db.js";
import bcrypt from "bcrypt";
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


app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" ||
        typeof password !== "string") {
      return res.status(400).json({
        error: "Email and password are required."
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password."
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password."
      });
    }

    // Create a fresh session after successful login.
    req.session.regenerate((error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          error: "Unable to create session."
        });
      }

      req.session.userId = user.id;
      req.session.role = user.role;

      req.session.save((error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            error: "Unable to save session."
          });
        }

        res.json({
          message: "Login successful",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "Login failed."
    });
  }
});


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