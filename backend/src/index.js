import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/book", async (req, res) => {
  const { name, email, date, time } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings (name, email, date, time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, date, time]
    );

    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        error: "Data e hora não disponíveis"
      });
    }

    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.get("/bookings", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM bookings ORDER BY date ASC, time ASC"
  );

  res.json(result.rows);
});

app.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM bookings WHERE id = $1",
    [id]
  );

  res.json({ ok: true });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/availability", async (req, res) => {
  const { date } = req.query;

  const result = await pool.query(
    "SELECT time FROM bookings WHERE date = $1",
    [date]
  );

  const booked_times = result.rows.map(r => r.time);

  const all_times = ["09:00", "10:00", "11:00", "14:00", "15:00"];

  const available = all_times.filter(
    t => !booked_times.includes(t)
  );

  res.json(available);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});