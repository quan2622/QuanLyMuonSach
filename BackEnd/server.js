const express = require("express");
const cors = require("cors");
const ApiError = require("./src/api-error");
const routeAdmin = require("./src/routes/admin/index");
require('dotenv').config()
const database = require("./src/config/database");

const app = express();

app.use(cors());
app.use(express.json());

// connect database
database.connect();

// Route
routeAdmin(app);

// Cài đặt xử lý lỗi
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
