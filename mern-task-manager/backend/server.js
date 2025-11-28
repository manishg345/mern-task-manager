const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
