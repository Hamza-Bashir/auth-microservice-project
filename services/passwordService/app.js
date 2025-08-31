const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const routes = require("./route")






app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.get("/api/v1/health", (req, res) => {
  res.send("✅ Server is healthy");
});


app.use("/api/v1", routes)





module.exports = app;