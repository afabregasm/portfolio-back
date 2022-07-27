require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);

const allRoutes = require("./routes");
app.use("/api", allRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

const projectRouter = require("./routes/project.routes");
app.use("/api", projectRouter);

const orderRouter = require("./routes/order.routes");
app.use("/api", isAuthenticated, orderRouter);

// For future development
// const resumeRouter = require("./routes/resume.routes");
// app.use("/api", resumeRouter);

module.exports = app;
