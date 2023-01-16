const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const incidentsRoutes = require("./routes/incident/index");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, {
  dbName: process.env.DATABASE_NAME,
}, () =>
  console.log("Database connected")
);

app.use(express.json());
app.use(cors());
app.use("/incidents", incidentsRoutes);

app.listen(4000, () => console.log("Server is up and running"));
