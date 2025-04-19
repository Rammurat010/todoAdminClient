const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Rammurat@12345",
  database: "todo_app",
});

// Register endpoint
app.post("/register", (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const sql =
    "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, password, role], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    return res.json({ message: "User registered successfully" });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0)
      return res.json({ message: "Login successful", user: results[0] });
    return res.status(401).json({ error: "Invalid credentials" });
  });
});

// GET all todos
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST new todo
app.post("/todos", (req, res) => {
  const { title, due_date, category, priority, status } = req.body;
  const sql =
    "INSERT INTO todos (title, due_date, category, priority, status) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title, due_date, category, priority, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Todo added successfully" });
    }
  );
});

// GET a specific user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) return res.json(results[0]);
    return res.status(404).json({ error: "User not found" });
  });
});

// PUT to update user data
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  const sql =
    "UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?";
  db.query(sql, [name, email, phone, password, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    return res.json({ message: "User updated successfully" });
  });
});

// PUT to change user password
app.put("/users/:id/change-password", (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  // Check if the current password is correct
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      const user = results[0];

      // Check if the current password matches
      if (user.password !== currentPassword) {
        return res.status(400).json({ error: "Incorrect current password" });
      }

      // Update the password
      const updateSql = "UPDATE users SET password = ? WHERE id = ?";
      db.query(updateSql, [newPassword, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.json({ message: "Password updated successfully" });
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
});
/////////////////////////////////////////

// API: Get paginated todos
app.get("/api/todos", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const totalQuery = "SELECT COUNT(*) AS total FROM todos";
  const dataQuery = "SELECT * FROM todos LIMIT ?, ?";

  db.query(totalQuery, (err, totalResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = totalResult[0].total;

    db.query(dataQuery, [offset, limit], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        data: results,
        total: total,
      });
    });
  });
});

////////////////////////////////////

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
