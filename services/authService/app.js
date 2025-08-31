const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const routes = require("./routes")


const authenticate = require("../../shared/middlewares/auth.middleware");
const authenticateRoutes = require("./config/unlessRoutes");

app.use(authenticate.unless({ path: authenticateRoutes }));
const errorHandler = require("../../shared/middlewares/error.middleware");
const notFound = require("../../shared/middlewares/notFound");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads")); 


app.get("/api/v1/health", (req, res) => {
  res.send("✅ Server is healthy");
});


app.use("/api/v1", routes)

app.use(notFound);
app.use(errorHandler);

module.exports = app;