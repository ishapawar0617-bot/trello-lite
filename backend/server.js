const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// DB
const connectDB = require("./config/db");

// INIT ENV + DB
dotenv.config();
connectDB();

// INIT APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes")); // ✅ only once

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});