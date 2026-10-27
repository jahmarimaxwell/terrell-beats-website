import pool from "../db.js";

export default async function requireAdmin(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({
      error: "You must sign in."
    });
  }

  try {
    const result = await pool.query(
      "SELECT role FROM users WHERE id = $1",
      [req.session.userId]
    );

    if (result.rows[0]?.role !== "admin") {
      return res.status(403).json({
        error: "Admin access required."
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}