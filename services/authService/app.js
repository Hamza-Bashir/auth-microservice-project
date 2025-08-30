const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.get("/api/v1/health", (req, res) => {
  res.send("✅ Server is healthy");
});










module.exports = app;